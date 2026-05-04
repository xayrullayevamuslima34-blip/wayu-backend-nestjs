import { Command } from '@nestjs/cqrs';

export class DeleteNewsCategoriesCommand extends Command<void> {
  id!: number;
}