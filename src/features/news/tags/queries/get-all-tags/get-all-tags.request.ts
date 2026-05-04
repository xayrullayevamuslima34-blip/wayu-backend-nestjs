import { Query } from '@nestjs/cqrs';
import { GetAllTagsResponse } from './get-all-tags.response';
import { GetAllTagsFilters } from './get-all-tags.filter';

export class GetAllTagsRequest extends Query<GetAllTagsResponse[]> {
  constructor(public readonly filters: GetAllTagsFilters) {
    super();
  }
}