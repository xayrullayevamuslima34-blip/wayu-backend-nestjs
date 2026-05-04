import { Query } from '@nestjs/cqrs';
import { GetAllAuthorsResponse } from './get-all-authors.response';
import { GetAllAuthorsFilters } from './get-all-authors.filters';

export class GetAllAuthorsRequest extends Query<GetAllAuthorsResponse[]>{
  constructor(public readonly filters: GetAllAuthorsFilters) {
    super();
  }
}