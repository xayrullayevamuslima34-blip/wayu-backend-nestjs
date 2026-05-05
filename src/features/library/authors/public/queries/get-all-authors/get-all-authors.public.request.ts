import { Query } from '@nestjs/cqrs';
import { GetAllAuthorsPublicResponse } from './get-all-authors.public.response';
import { GetAllAuthorsPublicFilters } from './get-all-authors.public.filters';

export class GetAllAuthorsPublicRequest extends Query<GetAllAuthorsPublicResponse[]>{
  constructor(public readonly filters: GetAllAuthorsPublicFilters) {
    super();
  }
}