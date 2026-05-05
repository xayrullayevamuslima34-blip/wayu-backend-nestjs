import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteUsefulLinksAdminRequest
} from '@/features/content/useful-links/admin/commands/delete-useful-links/delete-useful-links.admin.request';
import { UsefulLink } from '@/features/content/useful-links/useful-links.entity';

@CommandHandler(DeleteUsefulLinksAdminRequest)
export class DeleteUsefulLinksAdminHandler implements ICommandHandler<DeleteUsefulLinksAdminRequest>{
  constructor(@InjectRepository(UsefulLink) private readonly repo: Repository<UsefulLink>) {}

  async execute(cmd: DeleteUsefulLinksAdminRequest): Promise<void> {
        const newUsefulLink = await this.repo.findOneBy({ id: cmd.id });
        if (!newUsefulLink) throw new NotFoundException("Useful link with given id not found");
        await this.repo.remove(newUsefulLink);
    }
}