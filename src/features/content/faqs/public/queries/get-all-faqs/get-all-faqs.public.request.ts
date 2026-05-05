import { Query } from '@nestjs/cqrs';
import { GetAllFaqsPublicResponse } from './get-all-faqs.public.response';
import { GetAllFaqsPublicFilters } from './get-all-faqs.public.filters';

export class GetAllFaqsPublicRequest extends Query<GetAllFaqsPublicResponse[]>{
  constructor(public readonly filters: GetAllFaqsPublicFilters) {
    super();
  }
}