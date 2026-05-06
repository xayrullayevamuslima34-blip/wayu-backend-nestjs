import { Query } from '@nestjs/cqrs';
import { GetOneCountriesAdminResponse } from './get-one-countries.admin.response';

export class GetOneCountriesAdminRequest extends Query<GetOneCountriesAdminResponse>{
  id!: number;
}