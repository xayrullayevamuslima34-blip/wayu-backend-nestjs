import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoriesAdminResponse } from './get-one-book-categories.admin.response';

export class GetOneBookCategoriesAdminRequest extends Query<GetOneBookCategoriesAdminResponse>{
  id!: number;
}