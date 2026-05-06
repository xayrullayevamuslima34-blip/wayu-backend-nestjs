import { DeleteAdminRequest } from '@/features/auth/super-admin/commands/delete-super-admin/delete-super.admin.request';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Role } from '@/core/enums/role.enum';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from '@/features/auth/auth.entity';
import { Repository } from 'typeorm';

@CommandHandler(DeleteAdminRequest)
export class DeleteAdminHandler implements ICommandHandler<DeleteAdminRequest> {
  constructor(@InjectRepository(Auth) private readonly repo: Repository<Auth>) {
  }

  async execute(command: DeleteAdminRequest): Promise<void> {
    const { id } = command;

    // Faqat Admin ekanligini tekshirish yetarli
    const admin = await this.repo.findOne({
      where: { id, role: Role.Admin },  // ← Super Admin emas!
    });

    if (!admin) {
      throw new NotFoundException(`ID ${id} bo'lgan admin topilmadi`);
    }

    await this.repo.remove(admin);
  }
}