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
import { plainToInstance } from 'class-transformer';

@CommandHandler(UpdateAdminRequest)
export class UpdateAdminHandler implements ICommandHandler<UpdateAdminRequest> {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async execute(command: UpdateAdminRequest): Promise<UpdateAdminResponse> {
    const { id, fullName, password, birthDate, isActive } = command;

    // Adminni topish
    const admin = await this.authRepository.findOneBy({id});

    if (!admin) {
      throw new NotFoundException(`ID ${id} bo'lgan admin topilmadi`);
    }

    // Field'larni yangilash
    if (fullName) {
      admin.fullName = fullName;
    }

    if (password) {
      admin.password = await argon2.hash(password);
    }

    if (birthDate !== undefined) {
      admin.birthDate = birthDate;
    }

    if (isActive !== undefined) {
      admin.isActive = isActive;
    }

    await this.authRepository.save(admin);

    return plainToInstance(UpdateAdminResponse, admin, {excludeExtraneousValues: true});
  }
}