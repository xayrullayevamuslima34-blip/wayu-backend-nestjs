import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateEventsAdminCommand } from './update-events.admin.command';
import {Event} from '../../../events.entity';
import {
  UpdateEventsAdminResponse
} from 'src/features/events/events/admin/commands/update-events/update-events.admin.response';

@CommandHandler(UpdateEventsAdminCommand)
export class UpdateEventsAdminHandler implements ICommandHandler<UpdateEventsAdminCommand> {
  async execute(cmd: UpdateEventsAdminCommand): Promise<UpdateEventsAdminResponse> {
    const event = await Event.findOne({ where: { id: cmd.id } });
    if (!event) throw new NotFoundException('Event not found');

    if (cmd.title)      event.title      = cmd.title;
    if (cmd.content)    event.content    = cmd.content;
    if (cmd.date)       event.date       = cmd.date;
    if (cmd.address)    event.address    = cmd.address;

    if (cmd.image) {
      if (event.image && fs.existsSync(event.image)) fs.rmSync(event.image);
      event.image = cmd.image.path;
    }

    await Event.save(event);
    return plainToInstance(UpdateEventsAdminResponse, event, { excludeExtraneousValues: true });
  }
}
