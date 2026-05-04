import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneExpensesRequest } from './get-one-expenses.request';
import { GetOneExpensesResponse } from './get-one-expenses.response';
import { Expense } from '../../expenses.entity';

@Injectable()
@QueryHandler(GetOneExpensesRequest)
export class GetOneExpensesHandler implements IQueryHandler<GetOneExpensesRequest> {
  async execute(query: GetOneExpensesRequest): Promise<GetOneExpensesResponse> {
    const expense = await Expense.findOneBy({ id: query.id });
    if (!expense) throw new NotFoundException('Expense not found');
    return plainToInstance(GetOneExpensesResponse, expense, { excludeExtraneousValues: true });
  }
}