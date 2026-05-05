import { Query } from '@nestjs/cqrs';
import { GetAllBooksAdminResponse } from './get-all-books.admin.response';
import { GetAllBooksAdminFilters } from './get-all-books.admin.filters';

export class GetAllBooksAdminRequest extends Query<GetAllBooksAdminResponse[]>{
  constructor(public readonly filters: GetAllBooksAdminFilters) {
    super();
  }
}