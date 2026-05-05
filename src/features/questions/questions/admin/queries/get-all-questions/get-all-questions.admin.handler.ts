import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllQuestionsAdminRequest } from './get-all-questions.admin.request';
import { GetAllQuestionsAdminResponse } from './get-all-questions.admin.response';
import { Question } from '../../../questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllQuestionsAdminRequest)
export class GetAllQuestionsAdminHandler implements IQueryHandler<GetAllQuestionsAdminRequest> {
  constructor(
    @InjectRepository(Question)
    private repo: Repository<Question>,
  ) {}

  async execute(query: GetAllQuestionsAdminRequest): Promise<GetAllQuestionsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const questions = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllQuestionsAdminResponse, questions, { excludeExtraneousValues: true });
  }
}