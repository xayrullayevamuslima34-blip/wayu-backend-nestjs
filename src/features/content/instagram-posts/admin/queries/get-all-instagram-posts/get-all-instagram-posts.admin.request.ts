import { Query } from '@nestjs/cqrs';
import {
  GetAllInstagramPostsAdminResponse
} from '@/features/content/instagram-posts/admin/queries/get-all-instagram-posts/get-all-instagram-posts.admin.response';
import {
  GetAllInstagramPostsAdminFilters
} from '@/features/content/instagram-posts/admin/queries/get-all-instagram-posts/get-all-instagram-posts.admin.filters';

export class GetAllInstagramPostsAdminRequest extends Query<GetAllInstagramPostsAdminResponse[]>{
  constructor(public readonly filters: GetAllInstagramPostsAdminFilters) {
    super();
  }
}