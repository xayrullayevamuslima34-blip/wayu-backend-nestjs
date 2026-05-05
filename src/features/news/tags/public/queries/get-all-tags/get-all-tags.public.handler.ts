import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../tags.entity';
import { GetAllTagsPublicRequest } from './get-all-tags.public.request';
import { GetAllTagsPublicResponse } from './get-all-tags.public.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
@QueryHandler(GetAllTagsPublicRequest)
export class GetAllTagsPublicHandler implements IQueryHandler<GetAllTagsPublicRequest> {
  constructor(
    @InjectRepository(Tags)
    private repo: Repository<Tags>,
  ) {}

  async execute(query: GetAllTagsPublicRequest): Promise<GetAllTagsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const tags = await this.repo.find({ skip: skip, take: take });
    return plainToInstance(GetAllTagsPublicResponse, tags, { excludeExtraneousValues: true });
  }
}