import { Query } from '@nestjs/cqrs';
import { GetAllQuestionsResponse } from './get-all-questions.response';
import { GetAllQuestionsFilters } from './get-all-questions.filters';

export class GetAllQuestionsRequest extends Query<GetAllQuestionsResponse[]>{
  constructor(public readonly filters: GetAllQuestionsFilters) {
    super();
  }
}