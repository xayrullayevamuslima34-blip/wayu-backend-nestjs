import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneVacanciesRequest } from './get-one-vacancies.request';
import { GetOneVacanciesResponse } from './get-one-vacancies.response';
import { Vacancy } from '../../vacancies.entity';

@Injectable()
@QueryHandler(GetOneVacanciesRequest)
export class GetOneVacanciesHandler implements IQueryHandler<GetOneVacanciesRequest> {
  async execute(query: GetOneVacanciesRequest): Promise<GetOneVacanciesResponse> {
    const vacancy = await Vacancy.findOneBy({ id: query.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return plainToInstance(GetOneVacanciesResponse, vacancy, { excludeExtraneousValues: true });
  }
}