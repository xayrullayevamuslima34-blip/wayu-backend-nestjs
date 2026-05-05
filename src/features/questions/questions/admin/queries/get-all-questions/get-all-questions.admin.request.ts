import { Query } from '@nestjs/cqrs';
import { GetAllQuestionsAdminResponse } from './get-all-questions.admin.response';
import { GetAllQuestionsAdminFilters } from './get-all-questions.admin.filters';

export class GetAllQuestionsAdminRequest extends Query<GetAllQuestionsAdminResponse[]>{
  constructor(public readonly filters: GetAllQuestionsAdminFilters) {
    super();
  }
}