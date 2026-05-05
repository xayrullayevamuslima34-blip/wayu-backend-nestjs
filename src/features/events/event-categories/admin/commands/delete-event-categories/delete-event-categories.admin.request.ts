import { Command } from '@nestjs/cqrs';

export class DeleteEventCategoriesAdminRequest extends Command<void> {
  id!: number;
}