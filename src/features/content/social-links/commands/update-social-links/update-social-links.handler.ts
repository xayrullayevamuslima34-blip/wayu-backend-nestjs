import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateSocialLinksRequest } from './update-social-links.request';
import { UpdateSocialLinksResponse } from './update-social-links.response';
import { SocialLink } from '../../social-links.entity';

@CommandHandler(UpdateSocialLinksRequest)
export class UpdateSocialLinksHandler implements ICommandHandler<UpdateSocialLinksRequest> {
  async execute(cmd: UpdateSocialLinksRequest): Promise<UpdateSocialLinksResponse> {
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
    return plainToInstance(UpdateSocialLinksResponse, socialLink, { excludeExtraneousValues: true });
  }
}