import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneEventCategoriesAdminRequest } from './get-one-event-categories.admin.request';
import { GetOneEventCategoriesAdminResponse } from './get-one-event-categories.admin.response';
import { EventCategories } from '../../../event-categories.entity';

@Injectable()
@QueryHandler(GetOneEventCategoriesAdminRequest)
export class GetOneEventCategoriesAdminHandler implements IQueryHandler<GetOneEventCategoriesAdminRequest> {
  async execute(query: GetOneEventCategoriesAdminRequest): Promise<GetOneEventCategoriesAdminResponse> {
    const eventCategory = await EventCategories.findOneBy({ id: query.id });
    if (!eventCategory) throw new NotFoundException('Event category not found');
    return plainToInstance(GetOneEventCategoriesAdminResponse, eventCategory, { excludeExtraneousValues: true });
  }
}