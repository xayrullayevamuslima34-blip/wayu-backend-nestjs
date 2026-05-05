import { Query } from '@nestjs/cqrs';
import { GetAllBookCategoriesPublicResponse } from './get-all-book-categories.public.response';
import { GetAllBookCategoriesPublicFilters } from './get-all-book-categories.public.filters';

export class GetAllBookCategoriesPublicRequest extends Query<GetAllBookCategoriesPublicResponse[]>{
  constructor(public readonly filters: GetAllBookCategoriesPublicFilters) {
    super();
  }
}