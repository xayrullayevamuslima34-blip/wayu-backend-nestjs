import { Query } from '@nestjs/cqrs';
import { GetAllVacanciesPublicResponse } from './get-all-vacancies.public.response';
import { GetAllVacanciesPublicFilters } from './get-all-vacancies.public.filters';

export class GetAllVacanciesPublicRequest extends Query<GetAllVacanciesPublicResponse[]>{
  constructor(public readonly  filters: GetAllVacanciesPublicFilters) {
    super();
  }
}