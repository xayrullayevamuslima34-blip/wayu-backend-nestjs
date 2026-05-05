import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLink } from '../../../useful-links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllUsefulLinksPublicRequest
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.request';
import {
  GetAllUsefulLinksPublicResponse
} from '@/features/content/useful-links/public/queries/get-all-useful-links/get-all-useful-links.public.response';

@QueryHandler(GetAllUsefulLinksPublicRequest)
export class GetAllUsefulLinksPublicHandler implements IQueryHandler<GetAllUsefulLinksPublicRequest> {
  constructor(
    @InjectRepository(UsefulLink)
    private repo: Repository<UsefulLink>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllUsefulLinksPublicRequest): Promise<GetAllUsefulLinksPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const usefulLinks = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return usefulLinks.map((link) => {
      const res = plainToInstance(GetAllUsefulLinksPublicResponse, link, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${link.icon}`;
      return res;
    });
  }
}