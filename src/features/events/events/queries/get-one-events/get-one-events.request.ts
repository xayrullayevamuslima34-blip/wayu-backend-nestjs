import { Query } from '@nestjs/cqrs';
import { GetOneEventResponse } from './get-one-events.response';

export class GetOneEventRequest extends Query<GetOneEventResponse>{
  id!: number;
}
