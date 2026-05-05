import { Query } from '@nestjs/cqrs';
import { GetAllBooksPublicResponse } from './get-all-books.public.response';
import { GetAllBooksPublicFilters } from './get-all-books.public.filters';

export class GetAllBooksPublicRequest extends Query<GetAllBooksPublicResponse[]>{
  constructor(public readonly filters: GetAllBooksPublicFilters) {
    super();
  }
}