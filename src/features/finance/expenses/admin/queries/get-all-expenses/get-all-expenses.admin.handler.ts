import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllExpensesAdminRequest } from './get-all-expenses.admin.request';
import { GetAllExpensesAdminResponses } from './get-all-expenses.admin.responses';
import { Expense } from '../../../expenses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllExpensesAdminRequest)
export class GetAllExpensesAdminHandler implements IQueryHandler<GetAllExpensesAdminRequest> {
  constructor(
    @InjectRepository(Expense)
    private repo: Repository<Expense>,
  ) {}

  async execute(query: GetAllExpensesAdminRequest): Promise<GetAllExpensesAdminResponses[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const expenses = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllExpensesAdminResponses, expenses, { excludeExtraneousValues: true });
  }
}