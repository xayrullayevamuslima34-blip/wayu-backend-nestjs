import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllVacanciesPublicRequest } from './get-all-vacancies.public.request';
import { GetAllVacanciesPublicResponse } from './get-all-vacancies.public.response';
import { Vacancy } from '../../../vacancies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllVacanciesPublicRequest)
export class GetAllVacanciesPublicHandler implements IQueryHandler<GetAllVacanciesPublicRequest> {
  constructor(
    @InjectRepository(Vacancy)
    private repo: Repository<Vacancy>,
  ) {}

  async execute(query: GetAllVacanciesPublicRequest): Promise<GetAllVacanciesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const vacancies = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllVacanciesPublicResponse, vacancies, { excludeExtraneousValues: true });
  }
}