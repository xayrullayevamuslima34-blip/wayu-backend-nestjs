import { Command } from '@nestjs/cqrs';
import { UpdateEventResponse } from './update-events.response';

export class UpdateEventCommand extends Command<UpdateEventResponse> {
  constructor(
    public id: number,
    public categoryId?: number,
    public title?: string,
    public content?: string,
    public image?: Express.Multer.File,
    public date?: Date,
    public address?: string,
  ) {
    super();
  }
}
