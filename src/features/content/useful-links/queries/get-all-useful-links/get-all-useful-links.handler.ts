import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllUsefulLinksRequest } from './get-all-useful-links.request';
import { GetAllUsefulLinksResponse } from './get-all-useful-links.response';
import { UsefulLink } from '../../useful-links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllUsefulLinksRequest)
export class GetAllUsefulLinksHandler implements IQueryHandler<GetAllUsefulLinksRequest> {
  constructor(
    @InjectRepository(UsefulLink)
    private repo: Repository<UsefulLink>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllUsefulLinksRequest): Promise<GetAllUsefulLinksResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const usefulLinks = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return usefulLinks.map((link) => {
      const res = plainToInstance(GetAllUsefulLinksResponse, link, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${link.icon}`;
      return res;
    });
  }
}