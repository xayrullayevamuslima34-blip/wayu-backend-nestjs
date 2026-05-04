import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneInstagramPostsRequest } from './get-one-instagram-posts.request';
import { GetOneInstagramPostsResponse } from './get-one-instagram-posts.response';
import { InstagramPost } from '../../instagram-posts.entity';

@Injectable()
@QueryHandler(GetOneInstagramPostsRequest)
export class GetOneInstagramPostsHandler implements IQueryHandler<GetOneInstagramPostsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneInstagramPostsRequest): Promise<GetOneInstagramPostsResponse> {
    const post = await InstagramPost.findOneBy({ id: query.id });
    if (!post) throw new NotFoundException('Instagram post not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneInstagramPostsResponse, post, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${post.image}`;

    return res;
  }
}