import { Query } from '@nestjs/cqrs';
import { GetAllAuthorsAdminResponse } from './get-all-authors.admin.response';
import { GetAllAuthorsAdminFilters } from './get-all-authors.admin.filters';

export class GetAllAuthorsAdminRequest extends Query<GetAllAuthorsAdminResponse[]>{
  constructor(public readonly filters: GetAllAuthorsAdminFilters) {
    super();
  }
}