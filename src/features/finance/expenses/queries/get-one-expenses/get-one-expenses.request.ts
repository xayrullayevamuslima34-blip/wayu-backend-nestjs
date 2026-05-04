import { Query } from '@nestjs/cqrs';
import { GetOneExpensesResponse } from './get-one-expenses.response';

export class GetOneExpensesRequest extends Query<GetOneExpensesResponse>{
  id!: number;
}