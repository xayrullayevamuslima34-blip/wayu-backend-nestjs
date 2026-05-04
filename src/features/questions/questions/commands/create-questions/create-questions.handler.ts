import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateQuestionsCommand } from './create-questions.command';
import { CreateQuestionsResponse } from './create-questions.response';
import { Question } from '../../questions.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateQuestionsCommand)
export class CreateQuestionsHandler implements ICommandHandler<CreateQuestionsCommand> {
  async execute(cmd: CreateQuestionsCommand): Promise<CreateQuestionsResponse> {
    const newQuestion = Question.create({
      fullName: cmd.fullName,
      phoneNumber: cmd.phoneNumber,
      question: cmd.question,
      status: cmd.status,
    });
    await Question.save(newQuestion);
    return plainToInstance(CreateQuestionsResponse, newQuestion, { excludeExtraneousValues: true });
  }

}