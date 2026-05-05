import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneNewsPublicRequest } from './get-one-news.public.request';
import { GetOneNewsPublicResponse } from './get-one-news.public.response';
import { News } from '../../../news.entity';

@QueryHandler(GetOneNewsPublicRequest)
export class GetOneNewsPublicHandler implements IQueryHandler<GetOneNewsPublicRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneNewsPublicRequest): Promise<GetOneNewsPublicResponse> {
    const news = await News.findOne({
      where: { id: query.id },
      relations: ['category', 'country', 'tags'],
    });
    if (!news) throw new NotFoundException('News not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneNewsPublicResponse, news, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${news.image}`;
    return res;
  }
}