import { plainToInstance } from 'class-transformer';
import { GetAllNewsCategoriesPublicRequest } from './get-all-news-categories.public.request';
import { GetAllNewsCategoriesPublicResponse } from './get-all-news-categories.public.response';
import { NewsCategories } from '../../../news-categories.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@QueryHandler(GetAllNewsCategoriesPublicRequest)
export class GetAllNewsCategoriesPublicHandler implements IQueryHandler<GetAllNewsCategoriesPublicRequest> {
  constructor(
    @InjectRepository(NewsCategories)
    private repo: Repository<NewsCategories>,
  ) {}

  async execute(query: GetAllNewsCategoriesPublicRequest): Promise<GetAllNewsCategoriesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({ skip: skip, take: take });
    return plainToInstance(GetAllNewsCategoriesPublicResponse, categories, { excludeExtraneousValues: true });

  }


}