import { Command } from '@nestjs/cqrs';
import { CreateEventCategoriesAdminResponse } from './create-event-categories.admin.response';

export class CreateEventCategoriesAdminCommand extends Command<CreateEventCategoriesAdminResponse>{
  constructor(
    public title: string,
  ) {
    super();
  }
}