import { Query } from '@nestjs/cqrs';
import { GetOneNewsResponse } from '../../../../news/news/admin/queries/get-one-news/get-one-news.response';
import { GetOneCountriesResponse } from './get-one-countries.response';

export class GetOneCountriesRequest extends Query<GetOneCountriesResponse>{
  id!: number;
}