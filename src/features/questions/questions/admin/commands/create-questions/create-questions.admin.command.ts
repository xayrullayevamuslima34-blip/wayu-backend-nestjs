import { Command } from '@nestjs/cqrs';
import { CreateQuestionsAdminResponse } from './create-questions.admin.response';
import { QuestionStatus } from '../../../../../../core/enums/questionStatus.enum';

export class CreateQuestionsAdminCommand extends Command<CreateQuestionsAdminResponse>{
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public question: string,
    public status: QuestionStatus,
  ) {
    super();
  }
}