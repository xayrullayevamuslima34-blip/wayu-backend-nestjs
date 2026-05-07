import { plainToInstance } from 'class-transformer';
import { GetAllNewsCategoriesAdminRequest } from './get-all-news-categories.admin.request';
import { GetAllNewsCategoriesAdminResponse } from './get-all-news-categories.admin.response';
import { NewsCategories } from '../../../news-categories.entity';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Inject } from '@nestjs/common';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { PaginatedResult } from '@/core/paginated-result.dto';
import { News } from '@/features/news/news/news.entity';



@QueryHandler(GetAllNewsCategoriesAdminRequest)
export class GetAllNewsCategoriesAdminHandler implements IQueryHandler<GetAllNewsCategoriesAdminRequest> {
  constructor(
    @InjectRepository(NewsCategories)
    private repo: Repository<NewsCategories>,
    @Inject(CACHE_MANAGER)
    private readonly cache: Cache

  ) {}

  async execute(query: GetAllNewsCategoriesAdminRequest): Promise<PaginatedResult> {
    const take = query.size ?? 10;
    const currentPage = query.page ?? 1;
    const skip = (currentPage - 1) * take;

    const cachePayload = await this.cache.get<PaginatedResult>(`news: ${currentPage}: ${take}`)
    if (cachePayload) {
      return cachePayload
    }

    const totalCount = await News.count();
    const totalPages = Math.ceil(totalCount / take);
    const previousPage = currentPage > 1 ? currentPage - 1 : 1;
    const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;


    const categories = await this.repo.find({ skip: skip, take: take });
    const data = plainToInstance(GetAllNewsCategoriesAdminResponse, categories, { excludeExtraneousValues: true });
    const payload = {  currentPage, totalCount, totalPages, nextPage, previousPage, data } as PaginatedResult;
    await this.cache.set(`news:${currentPage}:${take}`,payload);
    return payload;


  }


}