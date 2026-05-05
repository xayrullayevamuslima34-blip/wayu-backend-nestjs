import { Command } from '@nestjs/cqrs';

export class DeleteBookCategoriesAdminRequest extends Command<void> {
  id!: number;
}