import { Query } from '@nestjs/cqrs';
import { GetAllCountriesAdminResponse } from './get-all-countries.admin.response';
import { GetAllCountriesAdminFilters } from './get-all-countries.admin.filters';

export class GetAllCountriesAdminRequest extends Query<GetAllCountriesAdminResponse[]>{
  constructor(public readonly filters: GetAllCountriesAdminFilters) {
    super();
  }
}