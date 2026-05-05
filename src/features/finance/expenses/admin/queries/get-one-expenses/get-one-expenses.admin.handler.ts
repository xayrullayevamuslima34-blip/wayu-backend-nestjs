import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneExpensesAdminRequest } from './get-one-expenses.admin.request';
import { GetOneExpensesAdminResponse } from './get-one-expenses.admin.response';
import { Expense } from '../../../expenses.entity';

@Injectable()
@QueryHandler(GetOneExpensesAdminRequest)
export class GetOneExpensesAdminHandler implements IQueryHandler<GetOneExpensesAdminRequest> {
  async execute(query: GetOneExpensesAdminRequest): Promise<GetOneExpensesAdminResponse> {
    const expense = await Expense.findOneBy({ id: query.id });
    if (!expense) throw new NotFoundException('Expense not found');
    return plainToInstance(GetOneExpensesAdminResponse, expense, { excludeExtraneousValues: true });
  }
}