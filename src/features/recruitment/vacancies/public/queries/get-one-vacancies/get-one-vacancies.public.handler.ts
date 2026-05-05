import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneVacanciesPublicRequest } from './get-one-vacancies.public.request';
import { GetOneVacanciesPublicResponse } from './get-one-vacancies.public.response';
import { Vacancy } from '../../../vacancies.entity';

@Injectable()
@QueryHandler(GetOneVacanciesPublicRequest)
export class GetOneVacanciesPublicHandler implements IQueryHandler<GetOneVacanciesPublicRequest> {
  async execute(query: GetOneVacanciesPublicRequest): Promise<GetOneVacanciesPublicResponse> {
    const vacancy = await Vacancy.findOneBy({ id: query.id });
    if (!vacancy) throw new NotFoundException('Vacancy not found');
    return plainToInstance(GetOneVacanciesPublicResponse, vacancy, { excludeExtraneousValues: true });
  }
}