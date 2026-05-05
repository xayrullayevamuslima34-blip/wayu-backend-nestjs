import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneQuestionsPublicRequest } from './get-one-questions.public.request';
import { GetOneQuestionsPublicResponse } from './get-one-questions.public.response';
import { Question } from '../../../questions.entity';

@Injectable()
@QueryHandler(GetOneQuestionsPublicRequest)
export class GetOneQuestionsPublicHandler implements IQueryHandler<GetOneQuestionsPublicRequest> {
  async execute(query: GetOneQuestionsPublicRequest): Promise<GetOneQuestionsPublicResponse> {
    const question = await Question.findOneBy({ id: query.id });
    if (!question) throw new NotFoundException('Question not found');
    return plainToInstance(GetOneQuestionsPublicResponse, question, { excludeExtraneousValues: true });
  }
}