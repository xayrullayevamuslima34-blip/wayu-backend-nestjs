import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesAdminResponse } from './get-all-vacancies.admin.response';
import { GetAllVacanciesAdminFilters } from './get-all-vacancies.admin.filters';

export class GetAllVacanciesAdminRequest extends Query<GetAllVacanciesAdminResponse[]>{
  constructor(public readonly  filters: GetAllVacanciesAdminFilters) {
    super();
  }
}