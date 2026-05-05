import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateEventCategoriesAdminRequest } from './update-event-categories.admin.request';
import { UpdateEventCategoriesAdminResponse } from './update-event-categories.admin.response';
import { EventCategories } from '../../../event-categories.entity';

@CommandHandler(UpdateEventCategoriesAdminRequest)
export class UpdateEventCategoriesAdminHandler implements ICommandHandler<UpdateEventCategoriesAdminRequest> {
  async execute(cmd: UpdateEventCategoriesAdminRequest): Promise<UpdateEventCategoriesAdminResponse> {
    const eventCategory = await EventCategories.findOne({ where: { id: cmd.id } });
    if (!eventCategory) throw new NotFoundException('Event category not found');

    if (cmd.title) eventCategory.title = cmd.title;

    await EventCategories.save(eventCategory);
    return plainToInstance(UpdateEventCategoriesAdminResponse, eventCategory, { excludeExtraneousValues: true });
  }
}