import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateExpensesRequest } from './update-expenses.request';
import { UpdateExpensesResponse } from './update-expenses.response';
import { Expense } from '../../expenses.entity';

@CommandHandler(UpdateExpensesRequest)
export class UpdateExpensesHandler implements ICommandHandler<UpdateExpensesRequest> {
  async execute(cmd: UpdateExpensesRequest): Promise<UpdateExpensesResponse> {
    const expense = await Expense.findOne({ where: { id: cmd.id } });
    if (!expense) throw new NotFoundException('Expense not found');

    if (cmd.amount !== undefined) expense.amount = cmd.amount;
    if (cmd.date) expense.date = cmd.date;
    if (cmd.title) expense.title = cmd.title;
    if (cmd.description !== undefined) expense.description = cmd.description;
    if (cmd.transactionId) expense.transactionId = cmd.transactionId;

    await Expense.save(expense);
    return plainToInstance(UpdateExpensesResponse, expense, { excludeExtraneousValues: true });
  }
}