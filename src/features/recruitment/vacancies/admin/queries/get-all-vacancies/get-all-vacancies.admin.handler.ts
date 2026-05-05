import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllVacanciesAdminRequest } from './get-all-vacancies.admin.request';
import { GetAllVacanciesAdminResponse } from './get-all-vacancies.admin.response';
import { Vacancy } from '../../../vacancies.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllVacanciesAdminRequest)
export class GetAllVacanciesAdminHandler implements IQueryHandler<GetAllVacanciesAdminRequest> {
  constructor(
    @InjectRepository(Vacancy)
    private repo: Repository<Vacancy>,
  ) {}

  async execute(query: GetAllVacanciesAdminRequest): Promise<GetAllVacanciesAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const vacancies = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllVacanciesAdminResponse, vacancies, { excludeExtraneousValues: true });
  }
}