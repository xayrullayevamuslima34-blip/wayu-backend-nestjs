import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { UnauthorizedException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Auth } from '@/features/auth/auth.entity';
import { AdminLoginCommand, } from './login.command';
import { Role } from '@/core/enums/role.enum';
import { AdminLoginResponse } from '@/features/auth/admin/login.response';
import { JwtService } from '@nestjs/jwt';

@CommandHandler(AdminLoginCommand)
export class AdminLoginHandler implements ICommandHandler<AdminLoginCommand> {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
    private readonly jwtService: JwtService,
  ) {}

  async execute(command: AdminLoginCommand): Promise<AdminLoginResponse> {
    const { login, password } = command;

    const user = await this.authRepository.findOne({
      where: [
        { login: ILike(login), role: Role.Admin },
        { login: ILike(login), role: Role.SuperAdmin }
      ]
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Login yoki parol noto\'g\'ri');
    }

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) {
      throw new UnauthorizedException('Login yoki parol noto\'g\'ri');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Hisobingiz faol emas');
    }

    const payload = {
      id: user.id,
      login: user.login,
      fullName: user.fullName,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);

    return {
      accessToken,
    };
  }
}