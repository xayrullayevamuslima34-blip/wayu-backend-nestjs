import { Query } from '@nestjs/cqrs';
import { GetOneQuestionsAdminResponse } from './get-one-questions.admin.response';

export class GetOneQuestionsAdminRequest extends Query<GetOneQuestionsAdminResponse>{
  id!: number;
}