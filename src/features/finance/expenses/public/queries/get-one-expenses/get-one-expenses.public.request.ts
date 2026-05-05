import { Query } from '@nestjs/cqrs';
import { GetOneExpensesPublicResponse } from './get-one-expenses.public.response';

export class GetOneExpensesPublicRequest extends Query<GetOneExpensesPublicResponse>{
  id!: number;
}