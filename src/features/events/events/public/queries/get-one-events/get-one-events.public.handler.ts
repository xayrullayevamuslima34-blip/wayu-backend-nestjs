import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneEventsPublicResponse } from './get-one-events.public.response';
import { GetOneEventsPublicRequest } from './get-one-events.public.request';
import {Event} from '../../../events.entity';

@Injectable()
@QueryHandler(GetOneEventsPublicRequest)
export class GetOneEventsPublicHandler implements IQueryHandler<GetOneEventsPublicRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneEventsPublicRequest): Promise<GetOneEventsPublicResponse> {
    const event = await Event.findOne({
      where: { id: query.id },
      relations: ['category'],
    });
    if (!event) throw new NotFoundException('Event not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneEventsPublicResponse, event, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${event.image}`;

    return res;
  }
}

