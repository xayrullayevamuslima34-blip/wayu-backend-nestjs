import { Query } from '@nestjs/cqrs';
import { GetAllEventCategoriesPublicResponse } from './get-all-event-categories.public.response';
import { GetAllEventCategoriesPublicFilter } from './get-all-event-categories.public.filter';

export class GetAllEventCategoriesPublicRequest extends Query<GetAllEventCategoriesPublicResponse[]>{
  constructor(public readonly filters: GetAllEventCategoriesPublicFilter) {
    super();
  }
}
