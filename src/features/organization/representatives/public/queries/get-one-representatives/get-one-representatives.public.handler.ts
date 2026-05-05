import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneRepresentativesPublicRequest } from './get-one-representatives.public.request';
import { GetOneRepresentativesPublicResponse } from './get-one-representatives.public.response';
import { Representative } from '../../../representatives.entity';

@Injectable()
@QueryHandler(GetOneRepresentativesPublicRequest)
export class GetOneRepresentativesPublicHandler implements IQueryHandler<GetOneRepresentativesPublicRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneRepresentativesPublicRequest): Promise<GetOneRepresentativesPublicResponse> {
    const representative = await Representative.findOne({
      where: { id: query.id },
      relations: ['branch'],
    });
    if (!representative) throw new NotFoundException('Representative not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneRepresentativesPublicResponse, representative, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${representative.image}`;
    res.resume = `${baseUrl}/${representative.resume}`;

    return res;
  }
}