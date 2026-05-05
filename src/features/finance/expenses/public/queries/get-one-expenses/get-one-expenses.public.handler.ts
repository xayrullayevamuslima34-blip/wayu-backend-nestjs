import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneExpensesPublicRequest } from './get-one-expenses.public.request';
import { GetOneExpensesPublicResponse } from './get-one-expenses.public.response';
import { Expense } from '../../../expenses.entity';

@Injectable()
@QueryHandler(GetOneExpensesPublicRequest)
export class GetOneExpensesPublicHandler implements IQueryHandler<GetOneExpensesPublicRequest> {
  async execute(query: GetOneExpensesPublicRequest): Promise<GetOneExpensesPublicResponse> {
    const expense = await Expense.findOneBy({ id: query.id });
    if (!expense) throw new NotFoundException('Expense not found');
    return plainToInstance(GetOneExpensesPublicResponse, expense, { excludeExtraneousValues: true });
  }
}