import { Query } from '@nestjs/cqrs';
import { GetAllEventsResponse } from './get-all-events.response';
import { GetAllEventsFilter } from './get-all-events.filter';

export class GetAllEventsRequest extends Query<GetAllEventsResponse[]>{
  constructor(public readonly filters: GetAllEventsFilter) {
    super();
  }
}