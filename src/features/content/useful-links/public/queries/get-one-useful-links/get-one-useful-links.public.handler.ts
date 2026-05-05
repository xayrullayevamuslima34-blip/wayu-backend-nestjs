import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLink } from '../../../useful-links.entity';
import {
  GetOneUsefulLinksPublicRequest,
} from '@/features/content/useful-links/public/queries/get-one-useful-links/get-one-useful-links.public.request';
import {
  GetOneUsefulLinksPublicResponse,
} from '@/features/content/useful-links/public/queries/get-one-useful-links/get-one-useful-links.public.response';

@Injectable()
@QueryHandler(GetOneUsefulLinksPublicRequest)
export class GetOneUsefulLinksPublicHandler implements IQueryHandler<GetOneUsefulLinksPublicRequest> {
  constructor(private readonly config: ConfigService) {
  }

  async execute(query: GetOneUsefulLinksPublicRequest): Promise<GetOneUsefulLinksPublicResponse> {
    const usefulLink = await UsefulLink.findOneBy({ id: query.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneUsefulLinksPublicResponse, usefulLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${usefulLink.icon}`;

    return res;
  }
}