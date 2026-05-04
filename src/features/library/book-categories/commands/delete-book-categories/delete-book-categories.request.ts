import { Command } from '@nestjs/cqrs';

export class DeleteBookCategoriesRequest extends Command<void> {
  id!: number;
}