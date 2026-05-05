import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLink } from '../../../social-links.entity';
import {
  GetOneSocialLinksPublicRequest,
} from '@/features/content/social-links/public/queries/get-one-social-links/get-one-social-links.public.request';
import {
  GetOneSocialLinksPublicResponse,
} from '@/features/content/social-links/public/queries/get-one-social-links/get-one-social-links.public.response';

@Injectable()
@QueryHandler(GetOneSocialLinksPublicRequest)
export class GetOneSocialLinksPublicHandler implements IQueryHandler<GetOneSocialLinksPublicRequest> {
  constructor(private readonly config: ConfigService) {
  }

  async execute(query: GetOneSocialLinksPublicRequest): Promise<GetOneSocialLinksPublicResponse> {
    const socialLink = await SocialLink.findOneBy({ id: query.id });
    if (!socialLink) throw new NotFoundException('Social link not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneSocialLinksPublicResponse, socialLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${socialLink.icon}`;

    return res;
  }
}