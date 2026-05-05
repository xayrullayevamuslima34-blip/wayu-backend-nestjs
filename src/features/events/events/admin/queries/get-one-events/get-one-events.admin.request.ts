import { Query } from '@nestjs/cqrs';
import { GetOneEventsAdminResponse } from './get-one-events.admin.response';

export class GetOneEventsAdminRequest extends Query<GetOneEventsAdminResponse>{
  id!: number;
}
