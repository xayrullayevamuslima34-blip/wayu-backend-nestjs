import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneQuestionsAdminRequest } from './get-one-questions.admin.request';
import { GetOneQuestionsAdminResponse } from './get-one-questions.admin.response';
import { Question } from '../../../questions.entity';

@Injectable()
@QueryHandler(GetOneQuestionsAdminRequest)
export class GetOneQuestionsAdminHandler implements IQueryHandler<GetOneQuestionsAdminRequest> {
  async execute(query: GetOneQuestionsAdminRequest): Promise<GetOneQuestionsAdminResponse> {
    const question = await Question.findOneBy({ id: query.id });
    if (!question) throw new NotFoundException('Question not found');
    return plainToInstance(GetOneQuestionsAdminResponse, question, { excludeExtraneousValues: true });
  }
}