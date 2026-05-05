import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllApplicationsAdminRequest } from './get-all-applications.admin.request';
import { GetAllApplicationsAdminResponse } from './get-all-applications.admin.response';
import { Application } from '../../../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllApplicationsAdminRequest)
export class GetAllApplicationsAdminHandler implements IQueryHandler<GetAllApplicationsAdminRequest> {
  constructor(
    @InjectRepository(Application)
    private repo: Repository<Application>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllApplicationsAdminRequest): Promise<GetAllApplicationsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const applications = await this.repo.find({
      relations: ['vacancy'],
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return applications.map((app) => {
      const res = plainToInstance(GetAllApplicationsAdminResponse, app, { excludeExtraneousValues: true });
      res.resume = `${baseUrl}/${app.resume}`;
      return res;
    });
  }
}