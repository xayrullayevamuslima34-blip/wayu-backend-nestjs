import { Command } from '@nestjs/cqrs';
import { AdminLoginResponse } from '@/features/auth/admin/login.response';

export class AdminLoginCommand extends Command<AdminLoginResponse> {
  constructor(
    public readonly login: string,
    public readonly password: string,
  ) {
    super();
  }
}