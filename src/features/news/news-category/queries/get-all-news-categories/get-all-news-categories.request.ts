import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesResponse } from './get-all-news-categories.response';
import { GetAllNewsCategoriesFilters } from './get-all-news-categories.filters';

export class GetAllNewsCategoriesRequest extends Query<GetAllNewsCategoriesResponse[]>{
  constructor(public readonly filters: GetAllNewsCategoriesFilters) {
    super();
  }
}