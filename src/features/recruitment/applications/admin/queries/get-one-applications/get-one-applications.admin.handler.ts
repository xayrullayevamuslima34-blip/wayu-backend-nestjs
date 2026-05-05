import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneApplicationsAdminRequest } from './get-one-applications.admin.request';
import { GetOneApplicationsAdminResponse } from './get-one-applications.admin.response';
import { Application } from '../../../applications.entity';

@Injectable()
@QueryHandler(GetOneApplicationsAdminRequest)
export class GetOneApplicationsAdminHandler implements IQueryHandler<GetOneApplicationsAdminRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneApplicationsAdminRequest): Promise<GetOneApplicationsAdminResponse> {
    const application = await Application.findOne({
      where: { id: query.id },
      relations: ['vacancy'],
    });
    if (!application) throw new NotFoundException('Application not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneApplicationsAdminResponse, application, { excludeExtraneousValues: true });
    res.resume = `${baseUrl}/${application.resume}`;

    return res;
  }
}