import { Query } from '@nestjs/cqrs';
import { GetOneFaqsPublicResponse } from './get-one-faqs.public.response';

export class GetOneFaqsPublicRequest extends Query<GetOneFaqsPublicResponse>{
  id!: number;
}