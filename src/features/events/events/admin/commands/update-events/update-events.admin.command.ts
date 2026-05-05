import { Command } from '@nestjs/cqrs';
import {
  UpdateEventsAdminResponse
} from 'src/features/events/events/admin/commands/update-events/update-events.admin.response';

export class UpdateEventsAdminCommand extends Command<UpdateEventsAdminResponse> {
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
