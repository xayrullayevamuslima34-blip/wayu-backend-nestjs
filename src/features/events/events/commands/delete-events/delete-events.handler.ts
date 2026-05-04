import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {Event} from '../../events.entity';
import { DeleteEventRequest } from './delete-events.request';

@CommandHandler(DeleteEventRequest)
export class DeleteEventHandler implements ICommandHandler<DeleteEventRequest> {
  constructor(@InjectRepository(Event) private readonly repo: Repository<Event>) {}

  async execute(cmd: DeleteEventRequest): Promise<void> {
    const event = await this.repo.findOneBy({ id: cmd.id });
    if (!event) throw new NotFoundException(`Event with ID ${cmd.id} not found`);
    await this.repo.remove(event);
  }
}
