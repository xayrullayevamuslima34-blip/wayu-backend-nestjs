import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesAdminResponse } from './get-all-event-categories.admin.response';
import { GetAllEventCategoriesAdminFilter } from './get-all-event-categories.admin.filter';

export class GetAllEventCategoriesAdminRequest extends Query<GetAllEventCategoriesAdminResponse[]>{
  constructor(public readonly filters: GetAllEventCategoriesAdminFilter) {
    super();
  }
}
