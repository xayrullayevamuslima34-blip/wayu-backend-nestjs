import { Query } from '@nestjs/cqrs';
import { GetAllLanguagesPublicFilters } from './get-all-languages.public.filters';
import { GetAllLanguagesPublicResponse } from './get-all-languages.public.response';

export class GetAllLanguagesPublicRequest extends Query<GetAllLanguagesPublicResponse[]>{
  constructor(public readonly filters: GetAllLanguagesPublicFilters) {
    super();
  }
}