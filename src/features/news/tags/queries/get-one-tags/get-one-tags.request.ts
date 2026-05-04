import { Query } from '@nestjs/cqrs';
import { GetOneTagsResponse } from './get-one-tags.response';

export class GetOneTagsRequest extends Query<GetOneTagsResponse> {
  id!: number;
}