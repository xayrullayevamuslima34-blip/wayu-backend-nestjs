import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoriesResponse } from './get-one-book-categories.response';

export class GetOneBookCategoriesRequest extends Query<GetOneBookCategoriesResponse>{
  id!: number;
}