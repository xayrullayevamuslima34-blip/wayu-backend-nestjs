import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllNewsRequest } from './get-all-news.request';
import { GetAllNewsResponse } from './get-all-news.response';
import { News } from '../../../news.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllNewsRequest)
export class GetAllNewsHandler implements IQueryHandler<GetAllNewsRequest> {
  constructor(
    @InjectRepository(News)
    private repo: Repository<News>,
    private readonly config: ConfigService) {}

  async execute(query: GetAllNewsRequest): Promise<GetAllNewsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const newsList = await News.find({
      relations: ['category', 'country', 'tags'],
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return newsList.map((news) => {
      const res = plainToInstance(GetAllNewsResponse, news, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${news.image}`;
      return res;
    });
  }
}