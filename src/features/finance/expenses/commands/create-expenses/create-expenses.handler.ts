import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExpensesCommand } from './create-expenses.command';
import { CreateExpensesResponse } from './create-expenses.response';
import { Expense } from '../../expenses.entity';

@CommandHandler(CreateExpensesCommand)
export class CreateExpensesHandler implements ICommandHandler<CreateExpensesCommand> {
  async execute(cmd: CreateExpensesCommand): Promise<CreateExpensesResponse> {
    const newExpense = Expense.create({
      amount: cmd.amount,
      date: cmd.date,
      title: cmd.title,
      description: cmd.description,
      transactionId: cmd.transactionId,
    });
    await Expense.save(newExpense);
    return newExpense;
  }

}