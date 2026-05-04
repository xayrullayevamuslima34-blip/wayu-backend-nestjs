import { Query } from '@nestjs/cqrs';
import { GetAllExpensesResponses } from './get-all-expenses.responses';
import { GetAllExpensesFilters } from './get-all-expenses.filters';

export class GetAllExpensesRequest extends Query<GetAllExpensesResponses[]>{
  constructor(public readonly filters: GetAllExpensesFilters,) {
    super();
  }
}