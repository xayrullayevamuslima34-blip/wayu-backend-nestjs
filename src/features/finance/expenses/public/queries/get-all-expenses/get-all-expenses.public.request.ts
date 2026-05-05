import { Query } from '@nestjs/cqrs';
import { GetAllExpensesPublicResponses } from './get-all-expenses.public.responses';
import { GetAllExpensesPublicFilters } from './get-all-expenses.public.filters';

export class GetAllExpensesPublicRequest extends Query<GetAllExpensesPublicResponses[]>{
  constructor(public readonly filters: GetAllExpensesPublicFilters,) {
    super();
  }
}