import { Command } from '@nestjs/cqrs';

export class DeleteEventRequest extends Command<void> {
  id!: number;
}
