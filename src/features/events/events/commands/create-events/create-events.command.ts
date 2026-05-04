import { Command } from '@nestjs/cqrs';
import { CreateEventResponse } from './create-events.response';

export class CreateEventCommand extends Command<CreateEventResponse> {
  constructor(
    public categoryId: number,
    public title: string,
    public content: string,
    public image: Express.Multer.File,
    public date: Date,
    public address: string,
  ) {
    super();
  }
}