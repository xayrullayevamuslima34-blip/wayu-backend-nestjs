import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneEventResponse } from './get-one-events.response';
import { GetOneEventRequest } from './get-one-events.request';
import {Event} from '../../events.entity';

@Injectable()
@QueryHandler(GetOneEventRequest)
export class GetOneEventHandler implements IQueryHandler<GetOneEventRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneEventRequest): Promise<GetOneEventResponse> {
    const event = await Event.findOne({
      where: { id: query.id },
      relations: ['category'],
    });
    if (!event) throw new NotFoundException('Event not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneEventResponse, event, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${event.image}`;

    return res;
  }
}

