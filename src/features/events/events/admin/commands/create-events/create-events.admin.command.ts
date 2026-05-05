import { Command } from '@nestjs/cqrs';
import { CreateEventsAdminResponse } from 'src/features/events/events/admin/commands/create-events/create-events.admin.response';

export class CreateEventsAdminCommand extends Command<CreateEventsAdminResponse> {
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