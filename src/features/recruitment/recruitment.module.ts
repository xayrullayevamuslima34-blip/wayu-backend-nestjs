import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Application } from './applications/applications.entity';
import { Vacancy } from './vacancies/vacancies.entity';
import { ConfigModule } from '@nestjs/config';
import { ApplicationsAdminController, ApplicationsPublicController } from './applications/applications.controller';
import {
  VacanciesAdminController,
  VacanciesPublicController,
} from './vacancies/vacancies.controller';
import {
  GetAllApplicationsAdminHandler,
} from './applications/admin/queries/get-all-applications/get-all-applications.admin.handler';
import {
  GetOneApplicationsAdminHandler,
} from './applications/admin/queries/get-one-applications/get-one-applications.admin.handler';
import {
  CreateApplicationsAdminHandler,
} from './applications/admin/commands/create-applications/create-applications.admin.handler';
import {
  UpdateApplicationsAdminHandler,
} from './applications/admin/commands/update-applications/update-applications.admin.handler';
import {
  DeleteApplicationsAdminHandler,
} from './applications/admin/commands/delete-applications/delete-applications.admin.handler';
import {
  GetAllVacanciesAdminHandler,
} from './vacancies/admin/queries/get-all-vacancies/get-all-vacancies.admin.handler';
import {
  GetOneVacanciesAdminHandler,
} from './vacancies/admin/queries/get-one-vacancies/get-one-vacancies.admin.handler';
import {
  CreateVacanciesAdminHandler,
} from './vacancies/admin/commands/create-vacancies/create-vacancies.admin.handler';
import {
  UpdateVacanciesAdminHandler,
} from './vacancies/admin/commands/update-vacancies/update-vacancies.admin.handler';
import {
  DeleteVacanciesAdminHandler,
} from './vacancies/admin/commands/delete-vacancies/delete-vacancies.admin.handler';
import {
  GetAllApplicationsPublicHandler,
} from '@/features/recruitment/applications/public/queries/get-all-applications/get-all-applications.public.handler';
import {
  GetAllVacanciesPublicHandler,
} from '@/features/recruitment/vacancies/public/queries/get-all-vacancies/get-all-vacancies.public.handler';
import {
  GetOneVacanciesPublicHandler,
} from '@/features/recruitment/vacancies/public/queries/get-one-vacancies/get-one-vacancies.public.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Application, Vacancy]),
    ConfigModule],

  controllers: [
    ApplicationsAdminController, ApplicationsPublicController,
    VacanciesAdminController, VacanciesPublicController,
  ],

  providers: [
    GetAllApplicationsAdminHandler,
    GetOneApplicationsAdminHandler,
    CreateApplicationsAdminHandler,
    UpdateApplicationsAdminHandler,
    DeleteApplicationsAdminHandler,
    GetAllApplicationsPublicHandler,
    GetOneApplicationsAdminHandler,

    GetAllVacanciesAdminHandler,
    GetOneVacanciesAdminHandler,
    CreateVacanciesAdminHandler,
    UpdateVacanciesAdminHandler,
    DeleteVacanciesAdminHandler,
    GetAllVacanciesPublicHandler,
    GetOneVacanciesPublicHandler,
  ],

})

export class RecruitmentModule {
}