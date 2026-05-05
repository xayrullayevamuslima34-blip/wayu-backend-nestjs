import { Query } from '@nestjs/cqrs';
import { GetOneFaqsAdminResponse } from './get-one-faqs.admin.response';

export class GetOneFaqsAdminRequest extends Query<GetOneFaqsAdminResponse>{
  id!: number;
}