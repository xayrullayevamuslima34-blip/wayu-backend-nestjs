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

@CommandHandler(CreateAdminCommand)
export class CreateAdminHandler implements ICommandHandler<CreateAdminCommand> {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async execute(command: CreateAdminCommand): Promise<CreateAdminResponse> {
    const {
      fullName,
      login,
      password,
      loginType,
      birthDate,
      isActive,
    } = command;

    // 2. Login mavjudligini tekshirish
    const existingUser = await this.authRepository.findOne({
      where: { login: ILike(login) }
    });

    if (existingUser) {
      throw new ConflictException(`"${login}" loginli foydalanuvchi allaqachon mavjud`);
    }

    // 3. Password mustahkamligini tekshirish
    if (password.length < 8) {
      throw new BadRequestException('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
    }

    // 4. Email formatini tekshirish (agar loginType Email bo'lsa)
    if (loginType === LoginType.Email) {
      const emailRegex = /^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/;
      if (!emailRegex.test(login)) {
        throw new BadRequestException('Noto\'g\'ri email formati');
      }
    }

    let user = this.authRepository.create({
      role: Role.Admin,  // Faqat Admin roli
      fullName,
      login,
      loginType,
      birthDate: birthDate,
      isActive: isActive !== undefined ? isActive : true,
    });

    user.password = await argon2.hash(password);

    try {
      await this.authRepository.save(user);
    } catch (error) {
      throw new BadRequestException('Admin yaratishda xatolik yuz berdi');
    }

    const { password: _, ...safe } = user;
    return safe as CreateAdminResponse;
  }
}