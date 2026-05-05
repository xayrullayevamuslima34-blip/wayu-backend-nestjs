import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneApplicationsPublicRequest } from './get-one-applications.public.request';
import { GetOneApplicationsPublicResponse } from './get-one-applications.public.response';
import { Application } from '../../../applications.entity';

@Injectable()
@QueryHandler(GetOneApplicationsPublicRequest)
export class GetOneApplicationsPublicHandler implements IQueryHandler<GetOneApplicationsPublicRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneApplicationsPublicRequest): Promise<GetOneApplicationsPublicResponse> {
    const application = await Application.findOne({
      where: { id: query.id },
      relations: ['vacancy'],
    });
    if (!application) throw new NotFoundException('Application not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneApplicationsPublicResponse, application, { excludeExtraneousValues: true });
    res.resume = `${baseUrl}/${application.resume}`;

    return res;
  }
}