import { Command } from '@nestjs/cqrs';

export class DeleteNewsAdminRequest extends Command<void> {
  id!: number;
}