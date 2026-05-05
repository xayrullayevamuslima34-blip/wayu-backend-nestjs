import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllCountriesPublicRequest } from './get-all-countries.public.request';
import { GetAllCountriesPublicResponse } from './get-all-countries.public.response';
import { Country } from '../../../countries.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllCountriesPublicRequest)
export class GetAllCountriesPublicHandler implements IQueryHandler<GetAllCountriesPublicRequest> {
  constructor(
    @InjectRepository(Country)
    private repo: Repository<Country>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllCountriesPublicRequest): Promise<GetAllCountriesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const countries = await this.repo.find({
      skip: skip,
      take: take,
      order: { id: 'ASC' },
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return countries.map((country) => {
      const res = plainToInstance(GetAllCountriesPublicResponse, country, { excludeExtraneousValues: true });
      res.flag = `${baseUrl}/${country.flag}`;
      return res;
    });
  }
}