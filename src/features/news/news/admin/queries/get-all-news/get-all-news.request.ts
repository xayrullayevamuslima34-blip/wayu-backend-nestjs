import { Query } from '@nestjs/cqrs';
import { GetAllNewsResponse } from './get-all-news.response';
import { GetAllNewsFilters } from './get-all-news.filter';

export class GetAllNewsRequest extends Query<GetAllNewsResponse[]> {
  constructor(public readonly filters: GetAllNewsFilters) {
    super();
  }
}
