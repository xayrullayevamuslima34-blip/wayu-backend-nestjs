import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLink } from '../../../useful-links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.response';
import {
  GetAllUsefulLinksAdminRequest,
} from '@/features/content/useful-links/admin/queries/get-all-useful-links/get-all-useful-links.admin.request';

@QueryHandler(GetAllUsefulLinksAdminRequest)
export class GetAllUsefulLinksAdminHandler implements IQueryHandler<GetAllUsefulLinksAdminRequest> {
  constructor(
    @InjectRepository(UsefulLink)
    private repo: Repository<UsefulLink>,
    private readonly config: ConfigService,
  ) {
  }

  async execute(query: GetAllUsefulLinksAdminRequest): Promise<GetAllUsefulLinksAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const usefulLinks = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return usefulLinks.map((link) => {
      const res = plainToInstance(GetAllUsefulLinksAdminResponse, link, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${link.icon}`;
      return res;
    });
  }
}