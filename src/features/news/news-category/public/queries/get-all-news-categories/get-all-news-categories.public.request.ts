import { Query } from '@nestjs/cqrs';
import { GetAllNewsCategoriesPublicResponse } from './get-all-news-categories.public.response';
import { GetAllNewsCategoriesPublicFilters } from './get-all-news-categories.public.filters';

export class GetAllNewsCategoriesPublicRequest extends Query<GetAllNewsCategoriesPublicResponse[]>{
  constructor(public readonly filters: GetAllNewsCategoriesPublicFilters) {
    super();
  }
}