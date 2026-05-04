import { Query } from '@nestjs/cqrs';
import { GetAllFaqsResponse } from './get-all-faqs.response';
import { GetAllFaqsFilters } from './get-all-faqs.filters';

export class GetAllFaqsRequest extends Query<GetAllFaqsResponse[]>{
  constructor(public readonly filters: GetAllFaqsFilters) {
    super();
  }
}