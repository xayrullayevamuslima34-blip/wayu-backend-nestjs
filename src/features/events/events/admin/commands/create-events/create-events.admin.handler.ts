import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { EventCategories } from '../../../../event-categories/event-categories.entity';
import { Event } from '../../../events.entity';
import { CreateEventsAdminCommand } from 'src/features/events/events/admin/commands/create-events/create-events.admin.command';
import { CreateEventsAdminResponse } from 'src/features/events/events/admin/commands/create-events/create-events.admin.response';

@CommandHandler(CreateEventsAdminCommand)
export class CreateEventsAdminHandler implements ICommandHandler<CreateEventsAdminCommand> {
  async execute(cmd: CreateEventsAdminCommand): Promise<CreateEventsAdminResponse> {
    const categoryExists = await EventCategories.existsBy({ id: cmd.categoryId });
    if (!categoryExists) {
      throw new NotFoundException('Event category with given id not found');
    }

    const newEvent = Event.create({
      categoryId: cmd.categoryId,
      title: cmd.title,
      content: cmd.content,
      image: cmd.image.path,
      date: cmd.date,
      address: cmd.address,
    } as unknown as Event);

    await Event.save(newEvent);

    return plainToInstance(CreateEventsAdminResponse, newEvent, { excludeExtraneousValues: true });
  }
}