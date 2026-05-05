import { Query } from '@nestjs/cqrs';
import { GetOneVacanciesPublicResponse } from './get-one-vacancies.public.response';

export class GetOneVacanciesPublicRequest extends Query<GetOneVacanciesPublicResponse>{
  id!: number;
}