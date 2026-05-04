import { Query } from '@nestjs/cqrs';
import { GetAllBooksResponse } from './get-all-books.response';
import { GetAllBookFilters } from './get-all-book.filters';

export class GetAllBooksRequest extends Query<GetAllBooksResponse[]>{
  constructor(public readonly filters: GetAllBookFilters) {
    super();
  }
}