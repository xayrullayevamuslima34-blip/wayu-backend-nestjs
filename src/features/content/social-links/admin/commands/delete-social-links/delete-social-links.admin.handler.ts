import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  DeleteSocialLinksAdminRequest,
} from '@/features/content/social-links/admin/commands/delete-social-links/delete-social-links.admin.request';
import { SocialLink } from '@/features/content/social-links/social-links.entity';

@CommandHandler(DeleteSocialLinksAdminRequest)
export class DeleteSocialLinksAdminHandler implements ICommandHandler<DeleteSocialLinksAdminRequest> {
  constructor(@InjectRepository(SocialLink) private readonly repo: Repository<SocialLink>) {
  }

  async execute(cmd: DeleteSocialLinksAdminRequest): Promise<void> {
    const newSocialLink = await this.repo.findOneBy({ id: cmd.id });
    if (!newSocialLink) throw new NotFoundException('Social link with given id not found');
    await this.repo.remove(newSocialLink);
  }
}