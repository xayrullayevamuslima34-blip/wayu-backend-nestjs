import { Query } from '@nestjs/cqrs';
import { GetOneNewsAdminResponse } from '../../../../../news/news/admin/queries/get-one-news/get-one-news.admin.response';
import { GetOneCountriesAdminResponse } from './get-one-countries.admin.response';

export class GetOneCountriesAdminRequest extends Query<GetOneCountriesAdminResponse>{
  id!: number;
}