import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneVacanciesAdminRequest } from './get-one-vacancies.admin.request';
import { GetOneVacanciesAdminResponse } from './get-one-vacancies.admin.response';
import { Vacancy } from '../../../vacancies.entity';

@Injectable()
@QueryHandler(GetOneVacanciesAdminRequest)
export class GetOneVacanciesAdminHandler implements IQueryHandler<GetOneVacanciesAdminRequest> {
  async execute(query: GetOneVacanciesAdminRequest): Promise<GetOneVacanciesAdminResponse> {
    const vacancy = await Vacancy.findOneBy({ id: query.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return plainToInstance(GetOneVacanciesAdminResponse, vacancy, { excludeExtraneousValues: true });
  }
}