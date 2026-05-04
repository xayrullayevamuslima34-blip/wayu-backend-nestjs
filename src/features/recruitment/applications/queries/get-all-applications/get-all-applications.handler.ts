import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllApplicationsRequest } from './get-all-applications.request';
import { GetAllApplicationsResponse } from './get-all-applications.response';
import { Application } from '../../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllApplicationsRequest)
export class GetAllApplicationsHandler implements IQueryHandler<GetAllApplicationsRequest> {
  constructor(
    @InjectRepository(Application)
    private repo: Repository<Application>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllApplicationsRequest): Promise<GetAllApplicationsResponse[]> {
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
      const res = plainToInstance(GetAllApplicationsResponse, app, { excludeExtraneousValues: true });
      res.resume = `${baseUrl}/${app.resume}`;
      return res;
    });
  }
}