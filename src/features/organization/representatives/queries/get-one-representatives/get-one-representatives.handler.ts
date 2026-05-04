import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneRepresentativesRequest } from './get-one-representatives.request';
import { GetOneRepresentativesResponse } from './get-one-representatives.response';
import { Representative } from '../../representatives.entity';

@Injectable()
@QueryHandler(GetOneRepresentativesRequest)
export class GetOneRepresentativesHandler implements IQueryHandler<GetOneRepresentativesRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneRepresentativesRequest): Promise<GetOneRepresentativesResponse> {
    const representative = await Representative.findOne({
      where: { id: query.id },
      relations: ['branch'],
    });
    if (!representative) throw new NotFoundException('Representative not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneRepresentativesResponse, representative, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${representative.image}`;
    res.resume = `${baseUrl}/${representative.resume}`;

    return res;
  }
}