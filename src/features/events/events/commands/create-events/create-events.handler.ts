import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { NotFoundException } from '@nestjs/common';
import { CreateEventCommand } from './create-events.command';
import { CreateEventResponse } from './create-events.response';
import { EventCategories } from '../../../event-categories/event-categories.entity';
import { Event } from '../../events.entity';

@CommandHandler(CreateEventCommand)
export class CreateEventHandler implements ICommandHandler<CreateEventCommand> {
  async execute(cmd: CreateEventCommand): Promise<CreateEventResponse> {
    const categoryExists = await EventCategories.existsBy({ id: cmd.categoryId });
    if (!categoryExists) {
      throw new NotFoundException("Event category with given id not found");
    }

    const newEvent = Event.create({
      categoryId: cmd.categoryId,
      title: cmd.title,
      content: cmd.content,
      image: cmd.image.path,
      date: cmd.date,
      address: cmd.address
    } as unknown as Event);

    await Event.save(newEvent);

    return plainToInstance(CreateEventResponse, newEvent, { excludeExtraneousValues: true });
  }
}