import 'dotenv/config';
import * as argon2 from 'argon2';
import AppDataSource from '../data-source';
import { Auth } from '@/features/auth/auth.entity';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';

const MIN_PASSWORD_LENGTH = 8;

// Creates the first super admin from env variables. Safe to run on every deploy:
// does nothing if the login already exists.
async function seedSuperAdmin(): Promise<void> {
  const login = process.env.SUPERADMIN_LOGIN;
  const password = process.env.SUPERADMIN_PASSWORD;
  const fullName = process.env.SUPERADMIN_FULLNAME ?? 'Super Admin';

  if (!login || !password) {
    console.log('SUPERADMIN_LOGIN / SUPERADMIN_PASSWORD not set, skipping super admin seed');
    return;
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error(`SUPERADMIN_PASSWORD must be at least ${MIN_PASSWORD_LENGTH} characters`);
  }

  await AppDataSource.initialize();
  try {
    const repository = AppDataSource.getRepository(Auth);
    const existing = await repository.findOne({ where: { login } });
    if (existing) {
      console.log(`Super admin "${login}" already exists`);
      return;
    }

    await repository.save(
      repository.create({
        login,
        fullName,
        role: Role.SuperAdmin,
        loginType: LoginType.Email,
        isActive: true,
        password: await argon2.hash(password),
      }),
    );
    console.log(`Super admin "${login}" created`);
  } finally {
    await AppDataSource.destroy();
  }
}

seedSuperAdmin().catch((error) => {
  console.error('Super admin seed failed:', error);
  process.exit(1);
});
