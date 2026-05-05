import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { GetOneNewsAdminRequest } from './get-one-news.admin.request';
import { GetOneNewsAdminResponse } from './get-one-news.admin.response';
import { News } from '../../../news.entity';

@QueryHandler(GetOneNewsAdminRequest)
export class GetOneNewsAdminHandler implements IQueryHandler<GetOneNewsAdminRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneNewsAdminRequest): Promise<GetOneNewsAdminResponse> {
    const news = await News.findOne({
      where: { id: query.id },
      relations: ['category', 'country', 'tags'],
    });
    if (!news) throw new NotFoundException('News not found');
    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneNewsAdminResponse, news, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${news.image}`;
    return res;
  }
}