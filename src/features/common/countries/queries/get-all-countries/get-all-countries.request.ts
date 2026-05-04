import { Query } from '@nestjs/cqrs';
import { GetAllCountriesResponse } from './get-all-countries.response';
import { GetAllCountriesFilters } from './get-all-countries.filters';

export class GetAllCountriesRequest extends Query<GetAllCountriesResponse[]>{
  constructor(public readonly filters: GetAllCountriesFilters) {
    super();
  }
}