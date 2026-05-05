import { Query } from '@nestjs/cqrs';
import { GetOneExpensesAdminResponse } from './get-one-expenses.admin.response';

export class GetOneExpensesAdminRequest extends Query<GetOneExpensesAdminResponse>{
  id!: number;
}