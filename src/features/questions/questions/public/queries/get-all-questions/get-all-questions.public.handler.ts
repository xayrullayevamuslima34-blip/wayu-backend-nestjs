import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllQuestionsPublicRequest } from './get-all-questions.public.request';
import { GetAllQuestionsPublicResponse } from './get-all-questions.public.response';
import { Question } from '../../../questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllQuestionsPublicRequest)
export class GetAllQuestionsPublicHandler implements IQueryHandler<GetAllQuestionsPublicRequest> {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
  ) {}

  async execute(query: GetAllQuestionsPublicRequest): Promise<GetAllQuestionsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const questions = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllQuestionsPublicResponse, questions, { excludeExtraneousValues: true });
  }
}