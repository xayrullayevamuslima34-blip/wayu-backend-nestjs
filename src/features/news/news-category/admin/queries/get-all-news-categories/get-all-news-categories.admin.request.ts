import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesAdminResponse } from './get-all-news-categories.admin.response';
import { GetAllNewsCategoriesAdminFilters } from './get-all-news-categories.admin.filters';

export class GetAllNewsCategoriesAdminRequest extends Query<GetAllNewsCategoriesAdminResponse[]>{
  constructor(public readonly filters: GetAllNewsCategoriesAdminFilters) {
    super();
  }
}