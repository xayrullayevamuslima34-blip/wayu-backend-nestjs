import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoriesRequest } from './get-all-event-categories.request';
import { GetAllEventCategoriesResponse } from './get-all-event-categories.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategories } from '../../event-categories.entity';

@QueryHandler(GetAllEventCategoriesRequest)
export class GetAllEventCategoriesHandler implements IQueryHandler<GetAllEventCategoriesRequest> {
  constructor(
    @InjectRepository(EventCategories)
    private repo: Repository<EventCategories>,
  ) {}

  async execute(query: GetAllEventCategoriesRequest): Promise<GetAllEventCategoriesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllEventCategoriesResponse, categories, { excludeExtraneousValues: true });
  }
}