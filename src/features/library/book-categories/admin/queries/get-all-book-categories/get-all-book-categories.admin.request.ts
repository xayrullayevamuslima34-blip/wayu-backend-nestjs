import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoriesAdminResponse } from './get-all-book-categories.admin.response';
import { GetAllBookCategoriesAdminFilters } from './get-all-book-categories.admin.filters';

export class GetAllBookCategoriesAdminRequest extends Query<GetAllBookCategoriesAdminResponse[]>{
  constructor(public readonly filters: GetAllBookCategoriesAdminFilters) {
    super();
  }
}