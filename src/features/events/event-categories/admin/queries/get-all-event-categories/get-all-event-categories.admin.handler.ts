import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoriesAdminRequest } from './get-all-event-categories.admin.request';
import { GetAllEventCategoriesAdminResponse } from './get-all-event-categories.admin.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategories } from '../../../event-categories.entity';

@QueryHandler(GetAllEventCategoriesAdminRequest)
export class GetAllEventCategoriesAdminHandler implements IQueryHandler<GetAllEventCategoriesAdminRequest> {
  constructor(
    @InjectRepository(EventCategories)
    private repo: Repository<EventCategories>,
  ) {}

  async execute(query: GetAllEventCategoriesAdminRequest): Promise<GetAllEventCategoriesAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllEventCategoriesAdminResponse, categories, { excludeExtraneousValues: true });
  }
}