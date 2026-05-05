import { Query } from '@nestjs/cqrs';
import {
  GetOneNewsCategoryPublicResponse
} from '@/features/news/news-category/public/queries/get-one-news-category/get-one-news-category.public.response';

export class GetOneNewsCategoryPublicRequest extends Query<GetOneNewsCategoryPublicResponse> {
  id!: number;
}