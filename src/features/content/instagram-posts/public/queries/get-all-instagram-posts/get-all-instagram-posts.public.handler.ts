import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { InstagramPost } from '../../../instagram-posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllInstagramPostsPublicRequest
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.request';
import {
  GetAllInstagramPostsPublicResponse
} from '@/features/content/instagram-posts/public/queries/get-all-instagram-posts/get-all-instagram-posts.public.response';

@QueryHandler(GetAllInstagramPostsPublicRequest)
export class GetAllInstagramPostsPublicHandler implements IQueryHandler<GetAllInstagramPostsPublicRequest> {
  constructor(
    @InjectRepository(InstagramPost)
    private repo: Repository<InstagramPost>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllInstagramPostsPublicRequest): Promise<GetAllInstagramPostsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const posts = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return posts.map((post) => {
      const res = plainToInstance(GetAllInstagramPostsPublicResponse, post, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${post.image}`;
      return res;
    });
  }
}