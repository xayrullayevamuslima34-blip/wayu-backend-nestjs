import { Query } from '@nestjs/cqrs';
import { GetOneVacanciesResponse } from './get-one-vacancies.response';

export class GetOneVacanciesRequest extends Query<GetOneVacanciesResponse>{
  id!: number;
}