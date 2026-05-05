import { Query } from '@nestjs/cqrs';
import { GetOneTagsAdminResponse } from './get-one-tags.admin.response';

export class GetOneTagsAdminRequest extends Query<GetOneTagsAdminResponse> {
  id!: number;
}