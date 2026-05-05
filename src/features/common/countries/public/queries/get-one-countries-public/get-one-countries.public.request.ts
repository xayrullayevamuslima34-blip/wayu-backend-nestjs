import { Query } from '@nestjs/cqrs';
import { GetOneNewsAdminResponse } from '../../../../../news/news/admin/queries/get-one-news/get-one-news.admin.response';
import { GetOneCountriesPublicResponse } from './get-one-countries.public.response';

export class GetOneCountriesPublicRequest extends Query<GetOneCountriesPublicResponse>{
  id!: number;
}