import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './applications/applications.entity';
import { Vacancy } from './vacancies/vacancies.entity';
import { ConfigModule } from '@nestjs/config';
import { ApplicationsController } from './applications/applications.controller';
import { VacanciesController } from './vacancies/vacancies.controller';
import { GetAllApplicationsHandler } from './applications/queries/get-all-applications/get-all-applications.handler';
import { GetOneApplicationsHandler } from './applications/queries/get-one-applications/get-one-applications.handler';
import { CreateApplicationsHandler } from './applications/commands/create-applications/create-applications.handler';
import { UpdateApplicationsHandler } from './applications/commands/update-applications/update-applications.handler';
import { DeleteApplicationsHandler } from './applications/commands/delete-applications/delete-applications.handler';
import { GetAllVacanciesHandler } from './vacancies/queries/get-all-vacancies/get-all-vacancies.handler';
import { GetOneVacanciesHandler } from './vacancies/queries/get-one-vacancies/get-one-vacancies.handler';
import { CreateVacanciesHandler } from './vacancies/commands/create-vacancies/create-vacancies.handler';
import { UpdateVacanciesHandler } from './vacancies/commands/update-vacancies/update-vacancies.handler';
import { DeleteVacanciesHandler } from './vacancies/commands/delete-vacancies/delete-vacancies.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Vacancy]),
    ConfigModule],

  controllers: [
    ApplicationsController,
    VacanciesController,
  ],

  providers: [
    GetAllApplicationsHandler,
    GetOneApplicationsHandler,
    CreateApplicationsHandler,
    UpdateApplicationsHandler,
    DeleteApplicationsHandler,
    GetAllVacanciesHandler,
    GetOneVacanciesHandler,
    CreateVacanciesHandler,
    UpdateVacanciesHandler,
    DeleteVacanciesHandler,
  ],

})

export class RecruitmentModule {
}