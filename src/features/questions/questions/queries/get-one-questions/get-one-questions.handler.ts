import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneQuestionsRequest } from './get-one-questions.request';
import { GetOneQuestionsResponse } from './get-one-questions.response';
import { Question } from '../../questions.entity';

@Injectable()
@QueryHandler(GetOneQuestionsRequest)
export class GetOneQuestionsHandler implements IQueryHandler<GetOneQuestionsRequest> {
  async execute(query: GetOneQuestionsRequest): Promise<GetOneQuestionsResponse> {
    const question = await Question.findOneBy({ id: query.id });
    if (!question) throw new NotFoundException('Question not found');
    return plainToInstance(GetOneQuestionsResponse, question, { excludeExtraneousValues: true });
  }
}