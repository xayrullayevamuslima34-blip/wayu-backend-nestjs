import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPost } from '../../../instagram-posts.entity';
import {
  GetOneInstagramPostsAdminRequest,
} from '@/features/content/instagram-posts/admin/queries/get-one-instagram-posts/get-one-instagram-posts.admin.request';
import {
  GetOneInstagramPostsAdminResponse,
} from '@/features/content/instagram-posts/admin/queries/get-one-instagram-posts/get-one-instagram-posts.admin.response';

@Injectable()
@QueryHandler(GetOneInstagramPostsAdminRequest)
export class GetOneInstagramPostsAdminHandler implements IQueryHandler<GetOneInstagramPostsAdminRequest> {
  constructor(private readonly config: ConfigService) {
  }

  async execute(query: GetOneInstagramPostsAdminRequest): Promise<GetOneInstagramPostsAdminResponse> {
    const post = await InstagramPost.findOneBy({ id: query.id });
    if (!post) throw new NotFoundException('Instagram post not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneInstagramPostsAdminResponse, post, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${post.image}`;

    return res;
  }
}