import { Query } from '@nestjs/cqrs';
import { GetAllEventsAdminResponse } from './get-all-events.admin.response';
import { GetAllEventsAdminFilter } from './get-all-events.admin.filter';

export class GetAllEventsAdminRequest extends Query<GetAllEventsAdminResponse[]>{
  constructor(public readonly filters: GetAllEventsAdminFilter) {
    super();
  }
}