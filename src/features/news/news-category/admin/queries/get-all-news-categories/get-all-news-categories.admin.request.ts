import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesAdminFilters } from './get-all-news-categories.admin.filters';
import { PaginatedResult } from '@/core/paginated-result.dto';

export class GetAllNewsCategoriesAdminRequest extends Query<PaginatedResult>{
  page?: number;
  size?: number;
  title?: string;

  constructor(filters: GetAllNewsCategoriesAdminFilters) {
    super();
    this.page = filters.page
    this.size = filters.size
    this.title = filters.title
  }
}