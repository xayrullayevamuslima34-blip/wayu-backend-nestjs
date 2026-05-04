import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneEventCategoriesRequest } from './get-one-event-categories.request';
import { GetOneEventCategoriesResponse } from './get-one-event-categories.response';
import { EventCategories } from '../../event-categories.entity';

@Injectable()
@QueryHandler(GetOneEventCategoriesRequest)
export class GetOneEventCategoriesHandler implements IQueryHandler<GetOneEventCategoriesRequest> {
  async execute(query: GetOneEventCategoriesRequest): Promise<GetOneEventCategoriesResponse> {
    const eventCategory = await EventCategories.findOneBy({ id: query.id });
    if (!eventCategory) throw new NotFoundException('Event category not found');
    return plainToInstance(GetOneEventCategoriesResponse, eventCategory, { excludeExtraneousValues: true });
  }
}