import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../tags.entity';
import { GetAllTagsRequest } from './get-all-tags.request';
import { GetAllTagsResponse } from './get-all-tags.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
@QueryHandler(GetAllTagsRequest)
export class GetAllTagsHandler implements IQueryHandler<GetAllTagsRequest> {
  constructor(
    @InjectRepository(Tags)
    private repo: Repository<Tags>,
  ) {}

  async execute(query: GetAllTagsRequest): Promise<GetAllTagsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const tags = await this.repo.find({ skip: skip, take: take });
    return plainToInstance(GetAllTagsResponse, tags, { excludeExtraneousValues: true });
  }
}