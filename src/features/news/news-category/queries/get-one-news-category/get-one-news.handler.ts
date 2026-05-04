import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneNewsCategoriesQuery } from './get-one-news.request';
import { GetOneNewsCategoriesResponse } from './get-one-news.response';
import { NewsCategories } from '../../news-categories.entity';

@Injectable()
@QueryHandler(GetOneNewsCategoriesQuery)
export class GetOneNewsCategoriesHandler implements IQueryHandler<GetOneNewsCategoriesQuery> {
  async execute(query: GetOneNewsCategoriesQuery): Promise<GetOneNewsCategoriesResponse> {
    const category = await NewsCategories.findOneBy({ id: query.id });
    if (!category) throw new NotFoundException('News category not found');
    return plainToInstance(GetOneNewsCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}