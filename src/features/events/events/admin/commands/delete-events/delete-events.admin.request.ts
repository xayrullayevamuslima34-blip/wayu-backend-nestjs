import { Command } from '@nestjs/cqrs';

export class DeleteEventsAdminRequest extends Command<void> {
  id!: number;
}
