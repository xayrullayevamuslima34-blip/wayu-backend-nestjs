import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLink } from '../../../social-links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllSocialLinksAdminRequest,
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.request';
import {
  GetAllSocialLinksAdminResponse,
} from '@/features/content/social-links/admin/queries/get-all-social-links/get-all-social-links.admin.response';

@QueryHandler(GetAllSocialLinksAdminRequest)
export class GetAllSocialLinksAdminHandler implements IQueryHandler<GetAllSocialLinksAdminRequest> {
  constructor(
    @InjectRepository(SocialLink)
    private repo: Repository<SocialLink>,
    private readonly config: ConfigService,
  ) {
  }

  async execute(query: GetAllSocialLinksAdminRequest): Promise<GetAllSocialLinksAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const socialLinks = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return socialLinks.map((link) => {
      const res = plainToInstance(GetAllSocialLinksAdminResponse, link, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${link.icon}`;
      return res;
    });
  }
}
