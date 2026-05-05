import { Query } from '@nestjs/cqrs';
import { GetOneNewsPublicResponse } from './get-one-news.public.response';

export class GetOneNewsPublicRequest extends Query<GetOneNewsPublicResponse> {
  id!: number;
}