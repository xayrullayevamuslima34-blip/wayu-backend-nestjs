import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateExpensesAdminRequest } from './update-expenses.admin.request';
import { UpdateExpensesAdminResponse } from './update-expenses.admin.response';
import { Expense } from '../../../expenses.entity';

@CommandHandler(UpdateExpensesAdminRequest)
export class UpdateExpensesAdminHandler implements ICommandHandler<UpdateExpensesAdminRequest> {
  async execute(cmd: UpdateExpensesAdminRequest): Promise<UpdateExpensesAdminResponse> {
    const expense = await Expense.findOne({ where: { id: cmd.id } });
    if (!expense) throw new NotFoundException('Expense not found');

    if (cmd.amount !== undefined) expense.amount = cmd.amount;
    if (cmd.date) expense.date = cmd.date;
    if (cmd.title) expense.title = cmd.title;
    if (cmd.description !== undefined) expense.description = cmd.description;
    if (cmd.transactionId) expense.transactionId = cmd.transactionId;

    await Expense.save(expense);
    return plainToInstance(UpdateExpensesAdminResponse, expense, { excludeExtraneousValues: true });
  }
}