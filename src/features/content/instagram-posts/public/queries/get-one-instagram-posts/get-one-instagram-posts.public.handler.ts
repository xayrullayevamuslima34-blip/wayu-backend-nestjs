import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPost } from '../../../instagram-posts.entity';
import {
  GetOneInstagramPostsPublicRequest,
} from '@/features/content/instagram-posts/public/queries/get-one-instagram-posts/get-one-instagram-posts.public.request';
import {
  GetOneInstagramPostsPublicResponse,
} from '@/features/content/instagram-posts/public/queries/get-one-instagram-posts/get-one-instagram-posts.public.response';

@Injectable()
@QueryHandler(GetOneInstagramPostsPublicRequest)
export class GetOneInstagramPostsPublicHandler implements IQueryHandler<GetOneInstagramPostsPublicRequest> {
  constructor(private readonly config: ConfigService) {
  }

  async execute(query: GetOneInstagramPostsPublicRequest): Promise<GetOneInstagramPostsPublicResponse> {
    const post = await InstagramPost.findOneBy({ id: query.id });
    if (!post) throw new NotFoundException('Instagram post not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneInstagramPostsPublicResponse, post, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${post.image}`;

    return res;
  }
}