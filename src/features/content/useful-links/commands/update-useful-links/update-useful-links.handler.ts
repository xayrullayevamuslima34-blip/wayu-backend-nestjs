import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateUsefulLinksRequest } from './update-useful-links.request';
import { UpdateUsefulLinksResponse } from './update-useful-links.response';
import { UsefulLink } from '../../useful-links.entity';

@CommandHandler(UpdateUsefulLinksRequest)
export class UpdateUsefulLinksHandler implements ICommandHandler<UpdateUsefulLinksRequest> {
  async execute(cmd: UpdateUsefulLinksRequest): Promise<UpdateUsefulLinksResponse> {
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
    return plainToInstance(UpdateUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
  }
}