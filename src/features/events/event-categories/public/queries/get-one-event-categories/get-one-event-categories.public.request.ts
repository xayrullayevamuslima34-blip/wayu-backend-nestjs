import { Query } from '@nestjs/cqrs';
import { GetOneEventCategoriesPublicResponse } from './get-one-event-categories.public.response';

export class GetOneEventCategoriesPublicRequest extends Query<GetOneEventCategoriesPublicResponse>{
  id!: number;
}

