import { Query } from '@nestjs/cqrs';
import { GetOneEventCategoriesAdminResponse } from './get-one-event-categories.admin.response';

export class GetOneEventCategoriesAdminRequest extends Query<GetOneEventCategoriesAdminResponse>{
  id!: number;
}

