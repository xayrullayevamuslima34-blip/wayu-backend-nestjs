import { Query } from '@nestjs/cqrs';
import { GetOneQuestionsPublicResponse } from './get-one-questions.public.response';

export class GetOneQuestionsPublicRequest extends Query<GetOneQuestionsPublicResponse>{
  id!: number;
}