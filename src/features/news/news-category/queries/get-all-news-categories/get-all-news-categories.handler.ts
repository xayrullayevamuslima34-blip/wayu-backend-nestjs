import { plainToInstance } from 'class-transformer';
import { GetAllNewsCategoriesRequest } from './get-all-news-categories.request';
import { GetAllNewsCategoriesResponse } from './get-all-news-categories.response';
import { NewsCategories } from '../../news-categories.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@QueryHandler(GetAllNewsCategoriesRequest)
export class GetAllNewsCategoriesHandler implements IQueryHandler<GetAllNewsCategoriesRequest> {
  constructor(
    @InjectRepository(NewsCategories)
    private repo: Repository<NewsCategories>,
  ) {}

  async execute(query: GetAllNewsCategoriesRequest): Promise<GetAllNewsCategoriesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({ skip: skip, take: take });
    return plainToInstance(GetAllNewsCategoriesResponse, categories, { excludeExtraneousValues: true });

  }


}