import { Command } from '@nestjs/cqrs';
import { CreateExpensesResponse } from './create-expenses.response';

export class CreateExpensesCommand extends Command<CreateExpensesResponse>{
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