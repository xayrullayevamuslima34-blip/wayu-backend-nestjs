import { Command } from '@nestjs/cqrs';

export class DeleteQuestionsAdminRequest extends Command<void> {
  id!: number;
}