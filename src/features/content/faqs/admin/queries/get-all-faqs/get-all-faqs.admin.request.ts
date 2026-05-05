import { Query } from '@nestjs/cqrs';
import { GetAllFaqsAdminResponse } from './get-all-faqs.admin.response';
import { GetAllFaqsAdminFilters } from './get-all-faqs.admin.filters';

export class GetAllFaqsAdminRequest extends Query<GetAllFaqsAdminResponse[]>{
  constructor(public readonly filters: GetAllFaqsAdminFilters) {
    super();
  }
}