import { Query } from '@nestjs/cqrs';
import { GetOneQuestionsResponse } from './get-one-questions.response';

export class GetOneQuestionsRequest extends Query<GetOneQuestionsResponse>{
  id!: number;
}