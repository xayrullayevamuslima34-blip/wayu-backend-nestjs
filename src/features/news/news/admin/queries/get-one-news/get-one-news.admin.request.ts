import { Query } from '@nestjs/cqrs';
import { GetOneNewsAdminResponse } from './get-one-news.admin.response';

export class GetOneNewsAdminRequest extends Query<GetOneNewsAdminResponse> {
  id!: number;
}