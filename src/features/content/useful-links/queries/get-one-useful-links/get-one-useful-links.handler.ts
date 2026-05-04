import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneUsefulLinksRequest } from './get-one-useful-links.request';
import { GetOneUsefulLinksResponse } from './get-one-useful-links.response';
import { UsefulLink } from '../../useful-links.entity';

@Injectable()
@QueryHandler(GetOneUsefulLinksRequest)
export class GetOneUsefulLinksHandler implements IQueryHandler<GetOneUsefulLinksRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneUsefulLinksRequest): Promise<GetOneUsefulLinksResponse> {
    const usefulLink = await UsefulLink.findOneBy({ id: query.id });
    if (!usefulLink) throw new NotFoundException('Useful link not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneUsefulLinksResponse, usefulLink, { excludeExtraneousValues: true });
    res.icon = `${baseUrl}/${usefulLink.icon}`;

    return res;
  }
}