import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { UsefulLink } from '../../../useful-links.entity';
import {
  GetOneUsefulLinksAdminRequest,
} from '@/features/content/useful-links/admin/queries/get-one-useful-links/get-one-useful-links.admin.request';
import {
  GetOneUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/queries/get-one-useful-links/get-one-useful-links.admin.response';

@Injectable()
@QueryHandler(GetOneUsefulLinksAdminRequest)
export class GetOneUsefulLinksAdminHandler implements IQueryHandler<GetOneUsefulLinksAdminRequest> {
  constructor(private readonly config: ConfigService) {
  }

  async execute(query: GetOneUsefulLinksAdminRequest): Promise<GetOneUsefulLinksAdminResponse> {
    const usefulLink = await UsefulLink.findOneBy({ id: query.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneUsefulLinksAdminResponse, usefulLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${usefulLink.icon}`;

    return res;
  }
}