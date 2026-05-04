import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllVacanciesRequest } from './get-all-vacancies.request';
import { GetAllVacanciesResponse } from './get-all-vacancies.response';
import { Vacancy } from '../../vacancies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllVacanciesRequest)
export class GetAllVacanciesHandler implements IQueryHandler<GetAllVacanciesRequest> {
  constructor(
    @InjectRepository(Vacancy)
    private repo: Repository<Vacancy>,
  ) {}

  async execute(query: GetAllVacanciesRequest): Promise<GetAllVacanciesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const vacancies = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllVacanciesResponse, vacancies, { excludeExtraneousValues: true });
  }
}