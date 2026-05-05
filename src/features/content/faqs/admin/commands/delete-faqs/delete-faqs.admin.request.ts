import { Command } from '@nestjs/cqrs';

export class DeleteFaqsAdminRequest extends Command<void> {
  id!: number;
}