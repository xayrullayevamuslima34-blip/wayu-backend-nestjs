import { Command } from '@nestjs/cqrs';
import { CreateVacanciesAdminResponse } from './create-vacancies.admin.response';
import { VacancyType } from '../../../../../../core/enums/vacancyType.enum';

export class CreateVacanciesAdminCommand extends Command<CreateVacanciesAdminResponse>{
  constructor(
    public title: string,
    public address: string,
    public description: string,
    public phoneNumber: string,
    public type: VacancyType,
    public salary: string,
    public isActive: boolean,
  ) {
    super();
  }
}