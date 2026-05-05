import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateExpensesAdminCommand } from './create-expenses.admin.command';
import { CreateExpensesAdminResponse } from './create-expenses.admin.response';
import { Expense } from '../../../expenses.entity';

@CommandHandler(CreateExpensesAdminCommand)
export class CreateExpensesAdminHandler implements ICommandHandler<CreateExpensesAdminCommand> {
  async execute(cmd: CreateExpensesAdminCommand): Promise<CreateExpensesAdminResponse> {
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