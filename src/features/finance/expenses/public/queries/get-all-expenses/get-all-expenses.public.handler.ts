import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllExpensesPublicRequest } from './get-all-expenses.public.request';
import { GetAllExpensesPublicResponses } from './get-all-expenses.public.responses';
import { Expense } from '../../../expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllExpensesPublicRequest)
export class GetAllExpensesPublicHandler implements IQueryHandler<GetAllExpensesPublicRequest> {
  constructor(
    @InjectRepository(Expense)
    private repo: Repository<Expense>,
  ) {}

  async execute(query: GetAllExpensesPublicRequest): Promise<GetAllExpensesPublicResponses[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const expenses = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllExpensesPublicResponses, expenses, { excludeExtraneousValues: true });
  }
}