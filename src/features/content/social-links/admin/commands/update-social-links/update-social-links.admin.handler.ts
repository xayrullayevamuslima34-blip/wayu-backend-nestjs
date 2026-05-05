import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import {
  UpdateSocialLinksAdminRequest,
} from '@/features/content/social-links/admin/commands/update-social-links/update-social-links.admin.request';
import {
  UpdateSocialLinksAdminResponse,
} from '@/features/content/social-links/admin/commands/update-social-links/update-social-links.admin.response';
import { SocialLink } from '@/features/content/social-links/social-links.entity';

@CommandHandler(UpdateSocialLinksAdminRequest)
export class UpdateSocialLinksAdminHandler implements ICommandHandler<UpdateSocialLinksAdminRequest> {
  async execute(cmd: UpdateSocialLinksAdminRequest): Promise<UpdateSocialLinksAdminResponse> {
    const socialLink = await SocialLink.findOne({ where: { id: cmd.id } });
    if (!socialLink) throw new NotFoundException('Social link not found');

    if (cmd.title) socialLink.title = cmd.title;
    if (cmd.link) socialLink.link = cmd.link;

    if (cmd.icon) {
      if (socialLink.icon && fs.existsSync(socialLink.icon)) {
        fs.rmSync(socialLink.icon);
      }
      socialLink.icon = cmd.icon.path;
    }

    await SocialLink.save(socialLink);
    return plainToInstance(UpdateSocialLinksAdminResponse, socialLink, { excludeExtraneousValues: true });
  }
}