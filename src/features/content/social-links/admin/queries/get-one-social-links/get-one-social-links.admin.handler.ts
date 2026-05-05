import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { SocialLink } from '../../../social-links.entity';
import {
  GetOneSocialLinksAdminRequest,
} from '@/features/content/social-links/admin/queries/get-one-social-links/get-one-social-links.admin.request';
import {
  GetOneSocialLinksAdminResponse,
} from '@/features/content/social-links/admin/queries/get-one-social-links/get-one-social-links.admin.response';

@Injectable()
@QueryHandler(GetOneSocialLinksAdminRequest)
export class GetOneSocialLinksAdminHandler implements IQueryHandler<GetOneSocialLinksAdminRequest> {
  constructor(private readonly config: ConfigService) {
  }

  async execute(query: GetOneSocialLinksAdminRequest): Promise<GetOneSocialLinksAdminResponse> {
    const socialLink = await SocialLink.findOneBy({ id: query.id });
    if (!socialLink) throw new NotFoundException('Social link not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneSocialLinksAdminResponse, socialLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${socialLink.icon}`;

    return res;
  }
}