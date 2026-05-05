import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneRepresentativesAdminRequest } from './get-one-representatives.admin.request';
import { GetOneRepresentativesAdminResponse } from './get-one-representatives.admin.response';
import { Representative } from '../../../representatives.entity';

@Injectable()
@QueryHandler(GetOneRepresentativesAdminRequest)
export class GetOneRepresentativesAdminHandler implements IQueryHandler<GetOneRepresentativesAdminRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneRepresentativesAdminRequest): Promise<GetOneRepresentativesAdminResponse> {
    const representative = await Representative.findOne({
      where: { id: query.id },
      relations: ['branch'],
    });
    if (!representative) throw new NotFoundException('Representative not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneRepresentativesAdminResponse, representative, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${representative.image}`;
    res.resume = `${baseUrl}/${representative.resume}`;

    return res;
  }
}