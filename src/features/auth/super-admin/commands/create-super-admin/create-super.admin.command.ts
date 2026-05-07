import { Command } from '@nestjs/cqrs';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';
import {
  CreateAdminResponse
} from '@/features/auth/super-admin/commands/create-super-admin/create-super.admin.response';

export class CreateAdminCommand extends Command<CreateAdminResponse>{
  constructor(
    public role: Role,
    public fullName: string,
    public login: string,
    public password: string,
    public loginType: LoginType,
    public isActive: boolean,
    public birthDate?: string,
  ) {
    super();
  }
}