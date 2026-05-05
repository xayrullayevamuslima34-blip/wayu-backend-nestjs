import { Query } from '@nestjs/cqrs';
import { GetAllNewsPublicResponse } from './get-all-news.public.response';
import { GetAllNewsPublicFilters } from '@/features/news/news/public/queries/get-all-news/get-all-news.public.filters';

export class GetAllNewsPublicRequest extends Query<GetAllNewsPublicResponse[]> {
  constructor(public readonly filters: GetAllNewsPublicFilters) {
    super();
  }
}
