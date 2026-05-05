import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneCountriesAdminRequest } from './get-one-countries.admin.request';
import { GetOneCountriesAdminResponse } from './get-one-countries.admin.response';
import { Country } from '../../../countries.entity';

@Injectable()
@QueryHandler(GetOneCountriesAdminRequest)
export class GetOneCountriesAdminHandler implements IQueryHandler<GetOneCountriesAdminRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneCountriesAdminRequest): Promise<GetOneCountriesAdminResponse> {
    const country = await Country.findOneBy({ id: query.id });
    if (!country) throw new NotFoundException('Country not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneCountriesAdminResponse, country, { excludeExtraneousValues: true });
    res.flag = `${baseUrl}/${country.flag}`;

    return res;
  }
}