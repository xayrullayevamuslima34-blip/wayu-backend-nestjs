import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../../news-categories.entity';
import {
  GetOneNewsCategoryPublicRequest,
} from '@/features/news/news-category/public/queries/get-one-news-category/get-one-news-category.public.request';
import {
  GetOneNewsCategoryPublicResponse,
} from '@/features/news/news-category/public/queries/get-one-news-category/get-one-news-category.public.response';

@Injectable()
@QueryHandler(GetOneNewsCategoryPublicRequest)
export class GetOneNewsCategoryPublicHandler implements IQueryHandler<GetOneNewsCategoryPublicRequest> {
  async execute(query: GetOneNewsCategoryPublicRequest): Promise<GetOneNewsCategoryPublicResponse> {
    const category = await NewsCategories.findOneBy({ id: query.id });
    if (!category) throw new NotFoundException('News category not found');
    return plainToInstance(GetOneNewsCategoryPublicResponse, category, { excludeExtraneousValues: true });
  }
}