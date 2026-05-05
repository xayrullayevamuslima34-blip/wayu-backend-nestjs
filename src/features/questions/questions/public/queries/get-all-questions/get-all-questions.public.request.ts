import { Query } from '@nestjs/cqrs';
import { GetAllQuestionsPublicResponse } from './get-all-questions.public.response';
import { GetAllQuestionsPublicFilters } from './get-all-questions.public.filters';

export class GetAllQuestionsPublicRequest extends Query<GetAllQuestionsPublicResponse[]>{
  constructor(public readonly filters: GetAllQuestionsPublicFilters) {
    super();
  }
}