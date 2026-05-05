import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionsAdminCommand } from './create-questions.admin.command';
import { CreateQuestionsAdminResponse } from './create-questions.admin.response';
import { Question } from '../../../questions.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateQuestionsAdminCommand)
export class CreateQuestionsAdminHandler implements ICommandHandler<CreateQuestionsAdminCommand> {
  async execute(cmd: CreateQuestionsAdminCommand): Promise<CreateQuestionsAdminResponse> {
    const newQuestion = Question.create({
      fullName: cmd.fullName,
      phoneNumber: cmd.phoneNumber,
      question: cmd.question,
      status: cmd.status,
    });
    await Question.save(newQuestion);
    return plainToInstance(CreateQuestionsAdminResponse, newQuestion, { excludeExtraneousValues: true });
  }

}