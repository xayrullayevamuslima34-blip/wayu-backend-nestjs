import { Command } from '@nestjs/cqrs';

export class DeleteExpensesAdminRequest extends Command<void> {
  id!: number;
}