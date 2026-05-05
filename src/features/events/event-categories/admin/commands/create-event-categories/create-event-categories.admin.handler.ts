import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateEventCategoriesAdminCommand } from './create-event-categories.admin.command';
import { CreateEventCategoriesAdminResponse } from './create-event-categories.admin.response';
import { EventCategories } from '../../../event-categories.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateEventCategoriesAdminCommand)
export class CreateEventCategoriesAdminHandler implements ICommandHandler<CreateEventCategoriesAdminCommand> {
    async execute(cmd: CreateEventCategoriesAdminCommand): Promise<CreateEventCategoriesAdminResponse> {
        const newEvent = EventCategories.create({
          title: cmd.title,
        })
      await EventCategories.save(newEvent);
        return plainToInstance(CreateEventCategoriesAdminResponse, newEvent, { excludeExtraneousValues: true });
    }

}