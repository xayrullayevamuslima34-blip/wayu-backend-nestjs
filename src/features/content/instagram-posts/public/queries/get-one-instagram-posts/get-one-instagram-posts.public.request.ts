import { Query } from '@nestjs/cqrs';
import {
  GetOneInstagramPostsPublicResponse
} from '@/features/content/instagram-posts/public/queries/get-one-instagram-posts/get-one-instagram-posts.public.response';

export class GetOneInstagramPostsPublicRequest extends Query<GetOneInstagramPostsPublicResponse>{
  id!: number;
}