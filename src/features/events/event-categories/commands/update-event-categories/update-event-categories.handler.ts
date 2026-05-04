import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateEventCategoriesRequest } from './update-event-categories.request';
import { UpdateEventCategoriesResponse } from './update-event-categories.response';
import { EventCategories } from '../../event-categories.entity';

@CommandHandler(UpdateEventCategoriesRequest)
export class UpdateEventCategoriesHandler implements ICommandHandler<UpdateEventCategoriesRequest> {
  async execute(cmd: UpdateEventCategoriesRequest): Promise<UpdateEventCategoriesResponse> {
    const eventCategory = await EventCategories.findOne({ where: { id: cmd.id } });
    if (!eventCategory) throw new NotFoundException('Event category not found');

    if (cmd.title) eventCategory.title = cmd.title;

    await EventCategories.save(eventCategory);
    return plainToInstance(UpdateEventCategoriesResponse, eventCategory, { excludeExtraneousValues: true });
  }
}