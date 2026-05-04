import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCategoriesCommand } from './create-event-categories.command';
import { CreateEventCategoriesResponse } from './create-event-categories.response';
import { EventCategories } from '../../event-categories.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateEventCategoriesCommand)
export class CreateEventCategoriesHandler implements ICommandHandler<CreateEventCategoriesCommand> {
    async execute(cmd: CreateEventCategoriesCommand): Promise<CreateEventCategoriesResponse> {
        const newEvent = EventCategories.create({
          title: cmd.title,
        })
      await EventCategories.save(newEvent);
        return plainToInstance(CreateEventCategoriesResponse, newEvent, { excludeExtraneousValues: true });
    }

}