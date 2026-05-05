import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../../../events.entity';
import { DeleteEventsAdminRequest } from 'src/features/events/events/admin/commands/delete-events/delete-events.admin.request';

@CommandHandler(DeleteEventsAdminRequest)
export class DeleteEventsAdminHandler implements ICommandHandler<DeleteEventsAdminRequest> {
  constructor(@InjectRepository(Event) private readonly repo: Repository<Event>) {
  }

  async execute(cmd: DeleteEventsAdminRequest): Promise<void> {
    const event = await this.repo.findOneBy({ id: cmd.id });
    if (!event) throw new NotFoundException(`Event with ID ${cmd.id} not found`);
    await this.repo.remove(event);
  }
}