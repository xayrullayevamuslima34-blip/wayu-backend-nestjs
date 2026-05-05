import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneCountriesPublicRequest } from './get-one-countries.public.request';
import { GetOneCountriesPublicResponse } from './get-one-countries.public.response';
import { Country } from '../../../countries.entity';

@Injectable()
@QueryHandler(GetOneCountriesPublicRequest)
export class GetOneCountriesPublicHandler implements IQueryHandler<GetOneCountriesPublicRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneCountriesPublicRequest): Promise<GetOneCountriesPublicResponse> {
    const country = await Country.findOneBy({ id: query.id });
    if (!country) throw new NotFoundException('Country not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneCountriesPublicResponse, country, { excludeExtraneousValues: true });
    res.flag = `${baseUrl}/${country.flag}`;

    return res;
  }
}