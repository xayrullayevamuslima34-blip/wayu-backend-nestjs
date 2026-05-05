import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { Tags } from '../../../tags.entity';
import { GetAllTagsAdminRequest } from './get-all-tags.admin.request';
import { GetAllTagsAdminResponse } from './get-all-tags.admin.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
@QueryHandler(GetAllTagsAdminRequest)
export class GetAllTagsAdminHandler implements IQueryHandler<GetAllTagsAdminRequest> {
  constructor(
    @InjectRepository(Tags)
    private repo: Repository<Tags>,
  ) {}

  async execute(query: GetAllTagsAdminRequest): Promise<GetAllTagsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const tags = await this.repo.find({ skip: skip, take: take });
    return plainToInstance(GetAllTagsAdminResponse, tags, { excludeExtraneousValues: true });
  }
}