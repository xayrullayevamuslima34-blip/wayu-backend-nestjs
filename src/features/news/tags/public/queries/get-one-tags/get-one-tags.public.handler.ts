import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../tags.entity';
import { GetOneTagsPublicRequest } from './get-one-tags.public.request';
import { GetOneTagsPublicResponse } from './get-one-tags.public.response';

@Injectable()
@QueryHandler(GetOneTagsPublicRequest)
export class GetOneTagsPublicHandler implements IQueryHandler<GetOneTagsPublicRequest> {
  async execute(query: GetOneTagsPublicRequest): Promise<GetOneTagsPublicResponse> {
    const tag = await Tags.findOneBy({ id: query.id });
    if (!tag) throw new NotFoundException('Tag not found');
    return plainToInstance(GetOneTagsPublicResponse, tag, { excludeExtraneousValues: true });
  }
}