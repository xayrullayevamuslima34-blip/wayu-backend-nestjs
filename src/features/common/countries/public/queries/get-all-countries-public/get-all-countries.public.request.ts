import { Query } from '@nestjs/cqrs';
import { GetAllCountriesPublicResponse } from './get-all-countries.public.response';
import { GetAllCountriesPublicFilters } from './get-all-countries.public.filters';

export class GetAllCountriesPublicRequest extends Query<GetAllCountriesPublicResponse[]>{
  constructor(public readonly filters: GetAllCountriesPublicFilters) {
    super();
  }
}