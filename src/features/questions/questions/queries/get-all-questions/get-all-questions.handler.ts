import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllQuestionsRequest } from './get-all-questions.request';
import { GetAllQuestionsResponse } from './get-all-questions.response';
import { Question } from '../../questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllQuestionsRequest)
export class GetAllQuestionsHandler implements IQueryHandler<GetAllQuestionsRequest> {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
  ) {}

  async execute(query: GetAllQuestionsRequest): Promise<GetAllQuestionsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const questions = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllQuestionsResponse, questions, { excludeExtraneousValues: true });
  }
}