import { Query } from '@nestjs/cqrs';
import { GetAllUsefulLinksResponse } from './get-all-useful-links.response';
import { GetAllUsefulLinksFilters } from './get-all-useful-links.filters';

export class GetAllUsefulLinksRequest extends Query<GetAllUsefulLinksResponse[]>{
  constructor(public readonly filters: GetAllUsefulLinksFilters) {
    super();
  }
}