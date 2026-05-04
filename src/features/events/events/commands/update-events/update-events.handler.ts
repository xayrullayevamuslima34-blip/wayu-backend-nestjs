import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateEventCommand } from './update-events.command';
import { UpdateEventResponse } from './update-events.response';
import {Event} from '../../events.entity';

@CommandHandler(UpdateEventCommand)
export class UpdateEventHandler implements ICommandHandler<UpdateEventCommand> {
  async execute(cmd: UpdateEventCommand): Promise<UpdateEventResponse> {
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
    return plainToInstance(UpdateEventResponse, event, { excludeExtraneousValues: true });
  }
}
