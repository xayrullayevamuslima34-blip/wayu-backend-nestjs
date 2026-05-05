import { Query } from '@nestjs/cqrs';
import { GetAllTagsAdminResponse } from './get-all-tags.admin.response';
import { GetAllTagsAdminFilters } from '@/features/news/tags/admin/queries/get-all-tags/get-all-tags.admin.filters';

export class GetAllTagsAdminRequest extends Query<GetAllTagsAdminResponse[]> {
  constructor(public readonly filters: GetAllTagsAdminFilters) {
    super();
  }
}