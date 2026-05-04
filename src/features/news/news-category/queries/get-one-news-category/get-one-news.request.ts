import { Query } from '@nestjs/cqrs';
import { GetOneNewsCategoriesResponse } from './get-one-news.response';

export class GetOneNewsCategoriesQuery extends Query<GetOneNewsCategoriesResponse> {
  id!: number;
}