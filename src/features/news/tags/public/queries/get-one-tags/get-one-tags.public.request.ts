import { Query } from '@nestjs/cqrs';
import { GetOneTagsPublicResponse } from './get-one-tags.public.response';

export class GetOneTagsPublicRequest extends Query<GetOneTagsPublicResponse> {
  id!: number;
}