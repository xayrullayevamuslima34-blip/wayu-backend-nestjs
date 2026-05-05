import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../tags.entity';
import { GetOneTagsAdminRequest } from './get-one-tags.admin.request';
import { GetOneTagsAdminResponse } from './get-one-tags.admin.response';

@Injectable()
@QueryHandler(GetOneTagsAdminRequest)
export class GetOneTagsAdminHandler implements IQueryHandler<GetOneTagsAdminRequest> {
  async execute(query: GetOneTagsAdminRequest): Promise<GetOneTagsAdminResponse> {
    const tag = await Tags.findOneBy({ id: query.id });
    if (!tag) throw new NotFoundException('Tag not found');
    return plainToInstance(GetOneTagsAdminResponse, tag, { excludeExtraneousValues: true });
  }
}