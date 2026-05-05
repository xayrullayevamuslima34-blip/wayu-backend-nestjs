import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../tags.entity';
import { UpdateTagsAdminRequest } from './update-tags.admin.request';
import { UpdateTagsAdminResponse } from './update-tags.admin.response';

@Injectable()
@CommandHandler(UpdateTagsAdminRequest)
export class UpdateTagsAdminHandler implements ICommandHandler<UpdateTagsAdminRequest> {
  async execute(cmd: UpdateTagsAdminRequest): Promise<UpdateTagsAdminResponse> {
    const tag = await Tags.findOneBy({ id: cmd.id });
    if (!tag) throw new NotFoundException('Tag not found');
    tag.title = cmd.title;
    await Tags.save(tag);
    return plainToInstance(UpdateTagsAdminResponse, tag, { excludeExtraneousValues: true });
  }
}