import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllExpensesRequest } from './get-all-expenses.request';
import { GetAllExpensesResponses } from './get-all-expenses.responses';
import { Expense } from '../../expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllExpensesRequest)
export class GetAllExpensesHandler implements IQueryHandler<GetAllExpensesRequest> {
  constructor(
    @InjectRepository(Expense)
    private repo: Repository<Expense>,
  ) {}

  async execute(query: GetAllExpensesRequest): Promise<GetAllExpensesResponses[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const expenses = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllExpensesResponses, expenses, { excludeExtraneousValues: true });
  }
}