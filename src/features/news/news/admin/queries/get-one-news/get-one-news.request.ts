import { Query } from '@nestjs/cqrs';
import { GetOneNewsResponse } from './get-one-news.response';

export class GetOneNewsRequest extends Query<GetOneNewsResponse> {
  id!: number;
}