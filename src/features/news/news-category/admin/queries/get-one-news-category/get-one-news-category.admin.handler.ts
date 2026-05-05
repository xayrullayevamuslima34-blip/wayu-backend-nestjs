import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../../news-categories.entity';
import {
  GetOneNewsCategoryAdminRequest
} from '@/features/news/news-category/admin/queries/get-one-news-category/get-one-news-category.admin.request';
import {
  GetOneNewsCategoryAdminResponse
} from '@/features/news/news-category/admin/queries/get-one-news-category/get-one-news-category.admin.response';

@Injectable()
@QueryHandler(GetOneNewsCategoryAdminRequest)
export class GetOneNewsCategoryAdminHandler implements IQueryHandler<GetOneNewsCategoryAdminRequest> {
  async execute(query: GetOneNewsCategoryAdminRequest): Promise<GetOneNewsCategoryAdminResponse> {
    const category = await NewsCategories.findOneBy({ id: query.id });
    if (!category) throw new NotFoundException('News category not found');
    return plainToInstance(GetOneNewsCategoryAdminResponse, category, { excludeExtraneousValues: true });
  }
}