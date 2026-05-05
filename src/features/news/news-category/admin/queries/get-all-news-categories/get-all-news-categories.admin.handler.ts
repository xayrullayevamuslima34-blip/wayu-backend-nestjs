import { plainToInstance } from 'class-transformer';
import { GetAllNewsCategoriesAdminRequest } from './get-all-news-categories.admin.request';
import { GetAllNewsCategoriesAdminResponse } from './get-all-news-categories.admin.response';
import { NewsCategories } from '../../../news-categories.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';


@QueryHandler(GetAllNewsCategoriesAdminRequest)
export class GetAllNewsCategoriesAdminHandler implements IQueryHandler<GetAllNewsCategoriesAdminRequest> {
  constructor(
    @InjectRepository(NewsCategories)
    private repo: Repository<NewsCategories>,
  ) {}

  async execute(query: GetAllNewsCategoriesAdminRequest): Promise<GetAllNewsCategoriesAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({ skip: skip, take: take });
    return plainToInstance(GetAllNewsCategoriesAdminResponse, categories, { excludeExtraneousValues: true });

  }


}