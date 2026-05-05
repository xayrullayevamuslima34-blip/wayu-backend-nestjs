import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLink } from '../../../social-links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllSocialLinksPublicRequest,
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.request';
import {
  GetAllSocialLinksPublicResponse,
} from '@/features/content/social-links/public/queries/get-all-social-links/get-all-social-links.public.response';

@QueryHandler(GetAllSocialLinksPublicRequest)
export class GetAllSocialLinksPublicHandler implements IQueryHandler<GetAllSocialLinksPublicRequest> {
  constructor(
    @InjectRepository(SocialLink)
    private repo: Repository<SocialLink>,
    private readonly config: ConfigService,
  ) {
  }

  async execute(query: GetAllSocialLinksPublicRequest): Promise<GetAllSocialLinksPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const socialLinks = await this.repo.find({
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return socialLinks.map((link) => {
      const res = plainToInstance(GetAllSocialLinksPublicResponse, link, { excludeExtraneousValues: true });
      res.icon = `${baseUrl}/${link.icon}`;
      return res;
    });
  }
}