import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateQuestionsRequest } from './update-questions.request';
import { UpdateQuestionsResponse } from './update-questions.response';
import { Question } from '../../questions.entity';

@CommandHandler(UpdateQuestionsRequest)
export class UpdateQuestionsHandler implements ICommandHandler<UpdateQuestionsRequest> {
  async execute(cmd: UpdateQuestionsRequest): Promise<UpdateQuestionsResponse> {
    const question = await Question.findOne({ where: { id: cmd.id } });
    if (!question) throw new NotFoundException('Question not found');

    if (cmd.fullName) question.fullName = cmd.fullName;
    if (cmd.phoneNumber) question.phoneNumber = cmd.phoneNumber;
    if (cmd.question) question.question = cmd.question;
    if (cmd.status) question.status = cmd.status;

    await Question.save(question);
    return plainToInstance(UpdateQuestionsResponse, question, { excludeExtraneousValues: true });
  }
}