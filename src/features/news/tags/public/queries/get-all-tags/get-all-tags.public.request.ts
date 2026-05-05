import { Query } from '@nestjs/cqrs';
import { GetAllTagsPublicResponse } from './get-all-tags.public.response';
import { GetAllTagsPublicFilters } from '@/features/news/tags/public/queries/get-all-tags/get-all-tags.public.filters';

export class GetAllTagsPublicRequest extends Query<GetAllTagsPublicResponse[]> {
  constructor(public readonly filters: GetAllTagsPublicFilters) {
    super();
  }
}