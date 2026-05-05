import { Query } from '@nestjs/cqrs';
import { GetAllExpensesAdminResponses } from './get-all-expenses.admin.responses';
import { GetAllExpensesAdminFilters } from './get-all-expenses.admin.filters';

export class GetAllExpensesAdminRequest extends Query<GetAllExpensesAdminResponses[]>{
  constructor(public readonly filters: GetAllExpensesAdminFilters,) {
    super();
  }
}