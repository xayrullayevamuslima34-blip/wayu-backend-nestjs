import { Query } from '@nestjs/cqrs';
import { GetOneEventsPublicResponse } from './get-one-events.public.response';

export class GetOneEventsPublicRequest extends Query<GetOneEventsPublicResponse>{
  id!: number;
}
