import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { BadRequestException,  ConflictException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';
import { Auth } from '@/features/auth/auth.entity';
import { CreateAdminCommand } from '@/features/auth/super-admin/commands/create-super-admin/create-super.admin.command';
import {
  CreateAdminResponse
} from '@/features/auth/super-admin/commands/create-super-admin/create-super.admin.response';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async execute(command: CreateAdminCommand): Promise<CreateAdminResponse> {

    // 2. Login mavjudligini tekshirish
    const existingUser = await this.authRepository.findOne({
      where: { login: ILike(command.login) }
    });

    if (existingUser) {
      throw new ConflictException(`"${command.login}" loginli foydalanuvchi allaqachon mavjud`);
    }

    // 3. Password mustahkamligini tekshirish
    if (command.password.length < 8) {
      throw new BadRequestException('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
    }

    let user = this.authRepository.create({
      role: command.role,
      fullName: command.fullName,
      login: command.login,
      loginType: command.loginType,
      birthDate: command.birthDate,
      isActive: command.isActive,
    });

    user.password = await argon2.hash(command.password);

    try {
      await this.authRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Foydalanuvchi yaratishda xatolik yuz berdi');
    }

    return plainToInstance(CreateAdminResponse, user, {excludeExtraneousValues: true});
  }
}