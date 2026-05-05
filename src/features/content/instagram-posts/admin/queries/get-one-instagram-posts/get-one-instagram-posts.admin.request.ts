import { Query } from '@nestjs/cqrs';
import {
  GetOneInstagramPostsAdminResponse
} from '@/features/content/instagram-posts/admin/queries/get-one-instagram-posts/get-one-instagram-posts.admin.response';

export class GetOneInstagramPostsAdminRequest extends Query<GetOneInstagramPostsAdminResponse>{
  id!: number;
}