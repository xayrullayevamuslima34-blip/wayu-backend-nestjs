import { Query } from '@nestjs/cqrs';
import { GetAllNewsAdminResponse } from './get-all-news.admin.response';
import { GetAllNewsAdminFilters } from '@/features/news/news/admin/queries/get-all-news/get-all-news.admin.filters';

export class GetAllNewsAdminRequest extends Query<GetAllNewsAdminResponse[]> {
  constructor(public readonly filters: GetAllNewsAdminFilters) {
    super();
  }
}
