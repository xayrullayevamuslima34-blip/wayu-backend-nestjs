import { Command } from '@nestjs/cqrs';
import { CreateQuestionsResponse } from './create-questions.response';
import { QuestionStatus } from '../../../../../core/enums/questionStatus.enum';

export class CreateQuestionsCommand extends Command<CreateQuestionsResponse>{
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public question: string,
    public status: QuestionStatus,
  ) {
    super();
  }
}