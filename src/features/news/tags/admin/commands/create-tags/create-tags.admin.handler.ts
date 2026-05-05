import { BadRequestException, Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../tags.entity';
import { CreateTagsAdminResponse } from './create-tags.admin.response';
import { CreateTagsAdminRequest } from './create-tags.admin.request';

@Injectable()
@CommandHandler(CreateTagsAdminRequest)
export class CreateTagsAdminHandler implements ICommandHandler<CreateTagsAdminRequest> {
  async execute(cmd: CreateTagsAdminRequest): Promise<CreateTagsAdminResponse> {
    const existing = await Tags.findOneBy({ title: cmd.title });
    if (existing) throw new BadRequestException('Tag already exists');
    const tag = Tags.create(cmd);
    await Tags.save(tag);
    return plainToInstance(CreateTagsAdminResponse, tag, { excludeExtraneousValues: true });
  }
}