// commands/update-admin/update-admin.handler.ts
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { Role } from '@/core/enums/role.enum';
import { Auth } from '@/features/auth/auth.entity';
import {
  UpdateAdminResponse
} from '@/features/auth/super-admin/commands/update-super-admin/update-super.admin.response';
import { UpdateAdminRequest } from '@/features/auth/super-admin/commands/update-super-admin/update-super.admin.request';

@CommandHandler(UpdateAdminRequest)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminRequest> {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async execute(command: UpdateAdminRequest): Promise<UpdateAdminResponse> {
    const { id, fullName, password, birthDate, isActive } = command;

    // Adminni topish
    const admin = await this.authRepository.findOne({
      where: { id, role: Role.Admin }
    });

    if (!admin) {
      throw new NotFoundException(`ID ${id} bo'lgan admin topilmadi`);
    }

    // Field'larni yangilash
    if (fullName) {
      admin.fullName = fullName;
    }

    if (password) {
      if (password.length < 8) {
        throw new BadRequestException('Parol kamida 8 ta belgidan iborat bo\'lishi kerak');
      }
      admin.password = await argon2.hash(password);
    }

    if (birthDate !== undefined) {
      admin.birthDate = birthDate || undefined;  // string yoki undefined
    }

    if (isActive !== undefined) {
      admin.isActive = isActive;
    }

    // Yangilangan vaqtni belgilash
    admin.updatedAt = new Date().toISOString();  // "2024-01-15T10:30:00.000Z"

    // Saqlash
    await this.authRepository.save(admin);

    // Passwordsiz qaytarish
    const { password: _, ...safe } = admin;
    return safe as UpdateAdminResponse;
  }
}