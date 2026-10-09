import * as argon2 from 'argon2';
import { DataSource } from 'typeorm';
import { Auth } from '@/features/auth/auth.entity';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';

// Test-only accounts, created in the isolated test database before each suite.
export const TEST_ADMIN = { login: 'admin@gmail.com', password: 'admin-password-123' };
export const TEST_SUPER_ADMIN = { login: 'superadmin@gmail.com', password: 'super-secret-123' };

export async function seedTestUsers(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(Auth);
  const users = [
    { ...TEST_ADMIN, role: Role.Admin, fullName: 'Test Admin' },
    { ...TEST_SUPER_ADMIN, role: Role.SuperAdmin, fullName: 'Test Super Admin' },
  ];

  for (const user of users) {
    const exists = await repository.findOne({ where: { login: user.login } });
    if (exists) continue;

    await repository.save(
      repository.create({
        login: user.login,
        fullName: user.fullName,
        role: user.role,
        loginType: LoginType.Email,
        isActive: true,
        password: await argon2.hash(user.password),
      }),
    );
  }
}
