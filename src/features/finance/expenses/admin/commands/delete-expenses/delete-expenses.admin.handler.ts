import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteExpensesAdminRequest } from './delete-expenses.admin.request';
import { Repository } from 'typeorm';
import { Expense } from '../../../expenses.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteExpensesAdminRequest)
export class DeleteExpensesAdminHandler implements ICommandHandler<DeleteExpensesAdminRequest> {
  constructor(@InjectRepository(Expense) private readonly repo: Repository<Expense>) {
  }

  async execute(cmd: DeleteExpensesAdminRequest): Promise<void> {
    const newExpenses = await this.repo.findOneBy({ id: cmd.id });
    if (!newExpenses) throw new NotFoundException('Expense with given id not found');
    await Expense.remove(newExpenses);
  }

}