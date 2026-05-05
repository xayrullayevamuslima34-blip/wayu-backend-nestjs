import { Query } from '@nestjs/cqrs';
import {
  GetAllInstagramPostsPublicResponse
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.response';
import {
  GetAllInstagramPostsPublicFilters
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.filters';

export class GetAllInstagramPostsPublicRequest extends Query<GetAllInstagramPostsPublicResponse[]>{
  constructor(public readonly filters: GetAllInstagramPostsPublicFilters) {
    super();
  }
}