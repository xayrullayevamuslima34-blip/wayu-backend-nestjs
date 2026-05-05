import { Query } from '@nestjs/cqrs';
import { GetAllEventsPublicResponse } from './get-all-events.public.response';
import { GetAllEventsPublicFilter } from './get-all-events.public.filter';

export class GetAllEventsPublicRequest extends Query<GetAllEventsPublicResponse[]>{
  constructor(public readonly filters: GetAllEventsPublicFilter) {
    super();
  }
}