import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneEventCategoriesPublicRequest } from './get-one-event-categories.public.request';
import { GetOneEventCategoriesPublicResponse } from './get-one-event-categories.public.response';
import { EventCategories } from '../../../event-categories.entity';

@Injectable()
@QueryHandler(GetOneEventCategoriesPublicRequest)
export class GetOneEventCategoriesPublicHandler implements IQueryHandler<GetOneEventCategoriesPublicRequest> {
  async execute(query: GetOneEventCategoriesPublicRequest): Promise<GetOneEventCategoriesPublicResponse> {
    const eventCategory = await EventCategories.findOneBy({ id: query.id });
    if (!eventCategory) throw new NotFoundException('Event category not found');
    return plainToInstance(GetOneEventCategoriesPublicResponse, eventCategory, { excludeExtraneousValues: true });
  }
}