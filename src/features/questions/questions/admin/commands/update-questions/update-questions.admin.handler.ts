import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateQuestionsAdminRequest } from './update-questions.admin.request';
import { UpdateQuestionsAdminResponse } from './update-questions.admin.response';
import { Question } from '../../../questions.entity';

@CommandHandler(UpdateQuestionsAdminRequest)
export class UpdateQuestionsAdminHandler implements ICommandHandler<UpdateQuestionsAdminRequest> {
  async execute(cmd: UpdateQuestionsAdminRequest): Promise<UpdateQuestionsAdminResponse> {
    const question = await Question.findOne({ where: { id: cmd.id } });
    if (!question) throw new NotFoundException('Question not found');

    if (cmd.fullName) question.fullName = cmd.fullName;
    if (cmd.phoneNumber) question.phoneNumber = cmd.phoneNumber;
    if (cmd.question) question.question = cmd.question;
    if (cmd.status) question.status = cmd.status;

    await Question.save(question);
    return plainToInstance(UpdateQuestionsAdminResponse, question, { excludeExtraneousValues: true });
  }
}