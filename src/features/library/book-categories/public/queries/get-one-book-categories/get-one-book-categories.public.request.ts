import { Query } from '@nestjs/cqrs';
import { GetOneBookCategoriesPublicResponse } from './get-one-book-categories.public.response';

export class GetOneBookCategoriesPublicRequest extends Query<GetOneBookCategoriesPublicResponse>{
  id!: number;
}