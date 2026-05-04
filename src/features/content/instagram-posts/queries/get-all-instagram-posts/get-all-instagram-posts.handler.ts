import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllInstagramPostsRequest } from './get-all-instagram-posts.request';
import { GetAllInstagramPostsResponse } from './get-all-instagram-posts.response';
import { InstagramPost } from '../../instagram-posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllInstagramPostsRequest)
export class GetAllInstagramPostsHandler implements IQueryHandler<GetAllInstagramPostsRequest> {
  constructor(
    @InjectRepository(InstagramPost)
    private repo: Repository<InstagramPost>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllInstagramPostsRequest): Promise<GetAllInstagramPostsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const posts = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return posts.map((post) => {
      const res = plainToInstance(GetAllInstagramPostsResponse, post, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${post.image}`;
      return res;
    });
  }
}