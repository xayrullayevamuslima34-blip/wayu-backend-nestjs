import { Query } from '@nestjs/cqrs';
import { GetOneVacanciesAdminResponse } from './get-one-vacancies.admin.response';

export class GetOneVacanciesAdminRequest extends Query<GetOneVacanciesAdminResponse>{
  id!: number;
}