import { Query } from '@nestjs/cqrs';
import {
  GetOneNewsCategoryAdminResponse
} from '@/features/news/news-category/admin/queries/get-one-news-category/get-one-news-category.admin.response';

export class GetOneNewsCategoryAdminRequest extends Query<GetOneNewsCategoryAdminResponse> {
  id!: number;
}