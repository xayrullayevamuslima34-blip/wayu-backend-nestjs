import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneEventsAdminResponse } from './get-one-events.admin.response';
import { GetOneEventsAdminRequest } from './get-one-events.admin.request';
import {Event} from '../../../events.entity';

@Injectable()
@QueryHandler(GetOneEventsAdminRequest)
export class GetOneEventsAdminHandler implements IQueryHandler<GetOneEventsAdminRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneEventsAdminRequest): Promise<GetOneEventsAdminResponse> {
    const event = await Event.findOne({
      where: { id: query.id },
      relations: ['category'],
    });
    if (!event) throw new NotFoundException('Event not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneEventsAdminResponse, event, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${event.image}`;

    return res;
  }
}

