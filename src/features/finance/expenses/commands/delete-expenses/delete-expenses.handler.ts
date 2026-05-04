import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteExpensesRequest } from './delete-expenses.request';
import { Repository } from 'typeorm';
import { Expense } from '../../expenses.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteExpensesRequest)
export class DeleteExpensesHandler implements ICommandHandler<DeleteExpensesRequest> {
  constructor(@InjectRepository(Expense) private readonly repo: Repository<Expense>) {
  }

  async execute(cmd: DeleteExpensesRequest): Promise<void> {
    const newExpenses = await this.repo.findOneBy({ id: cmd.id });
    if (!newExpenses) throw new NotFoundException('Expense with given id not found');
    await Expense.remove(newExpenses);
  }

}