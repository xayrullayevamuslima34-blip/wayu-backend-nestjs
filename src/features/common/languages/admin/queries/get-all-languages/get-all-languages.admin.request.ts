import { Query } from '@nestjs/cqrs';
import { GetAllLanguagesAdminFilters } from './get-all-languages.admin.filters';
import { GetAllLanguagesAdminResponse } from './get-all-languages.admin.response';

export class GetAllLanguagesAdminRequest extends Query<GetAllLanguagesAdminResponse[]>{
  constructor(public readonly filters: GetAllLanguagesAdminFilters) {
    super();
  }
}