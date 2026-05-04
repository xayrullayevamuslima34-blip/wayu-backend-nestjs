import { Command } from '@nestjs/cqrs';
import { CreateEventCategoriesResponse } from './create-event-categories.response';

export class CreateEventCategoriesCommand extends Command<CreateEventCategoriesResponse>{
  constructor(
    public title: string,
  ) {
    super();
  }
}