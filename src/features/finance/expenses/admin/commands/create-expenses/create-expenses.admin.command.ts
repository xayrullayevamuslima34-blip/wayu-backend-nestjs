import { Command } from '@nestjs/cqrs';
import { CreateExpensesAdminResponse } from './create-expenses.admin.response';

export class CreateExpensesAdminCommand extends Command<CreateExpensesAdminResponse>{
  constructor(
    public amount: number,
    public date: Date,
    public title: string,
    public transactionId: number,
    public description?: string,
  ) {
    super();
  }
}