import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllEventCategoriesPublicRequest } from './get-all-event-categories.public.request';
import { GetAllEventCategoriesPublicResponse } from './get-all-event-categories.public.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventCategories } from '../../../event-categories.entity';

@QueryHandler(GetAllEventCategoriesPublicRequest)
export class GetAllEventCategoriesPublicHandler implements IQueryHandler<GetAllEventCategoriesPublicRequest> {
  constructor(
    @InjectRepository(EventCategories)
    private repo: Repository<EventCategories>,
  ) {}

  async execute(query: GetAllEventCategoriesPublicRequest): Promise<GetAllEventCategoriesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllEventCategoriesPublicResponse, categories, { excludeExtraneousValues: true });
  }
}