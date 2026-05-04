import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesResponse } from './get-all-event-categories.response';
import { GetAllEventCategoriesFilter } from './get-all-event-categories.filter';

export class GetAllEventCategoriesRequest extends Query<GetAllEventCategoriesResponse[]>{
  constructor(public readonly filters: GetAllEventCategoriesFilter) {
    super();
  }
}
