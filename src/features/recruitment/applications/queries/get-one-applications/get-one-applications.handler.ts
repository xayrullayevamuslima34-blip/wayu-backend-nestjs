import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneApplicationsRequest } from './get-one-applications.request';
import { GetOneApplicationsResponse } from './get-one-applications.response';
import { Application } from '../../applications.entity';

@Injectable()
@QueryHandler(GetOneApplicationsRequest)
export class GetOneApplicationsHandler implements IQueryHandler<GetOneApplicationsRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneApplicationsRequest): Promise<GetOneApplicationsResponse> {
    const application = await Application.findOne({
      where: { id: query.id },
      relations: ['vacancy'],
    });
    if (!application) throw new NotFoundException('Application not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneApplicationsResponse, application, { excludeExtraneousValues: true });
    res.resume = `${baseUrl}/${application.resume}`;

    return res;
  }
}