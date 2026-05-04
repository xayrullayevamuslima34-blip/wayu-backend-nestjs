import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesResponse } from './get-all-vacancies.response';
import { GetAllVacanciesFilters } from './get-all-vacancies.filters';

export class GetAllVacanciesRequest extends Query<GetAllVacanciesResponse[]>{
  constructor(public readonly  filters: GetAllVacanciesFilters) {
    super();
  }
}