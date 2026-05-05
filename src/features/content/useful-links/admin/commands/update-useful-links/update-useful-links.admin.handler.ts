import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import {
  UpdateUsefulLinksAdminResponse
} from '@/features/content/useful-links/admin/commands/update-useful-links/update-useful-links.admin.response';
import {
  UpdateUsefulLinksAdminRequest
} from '@/features/content/useful-links/admin/commands/update-useful-links/update-useful-links.admin.request';
import { UsefulLink } from '@/features/content/useful-links/useful-links.entity';

@CommandHandler(UpdateUsefulLinksAdminRequest)
export class UpdateUsefulLinksAdminHandler implements ICommandHandler<UpdateUsefulLinksAdminRequest> {
  async execute(cmd: UpdateUsefulLinksAdminRequest): Promise<UpdateUsefulLinksAdminResponse> {
    const usefulLink = await UsefulLink.findOne({ where: { id: cmd.id } });
    if (!usefulLink) throw new NotFoundException('Useful link not found');

    if (cmd.title) usefulLink.title = cmd.title;
    if (cmd.link) usefulLink.link = cmd.link;

    if (cmd.icon) {
      if (usefulLink.icon && fs.existsSync(usefulLink.icon)) {
        fs.rmSync(usefulLink.icon);
      }
      usefulLink.icon = (cmd.icon as any).path;
    }

    await UsefulLink.save(usefulLink);
    return plainToInstance(UpdateUsefulLinksAdminResponse, usefulLink, { excludeExtraneousValues: true });
  }
}