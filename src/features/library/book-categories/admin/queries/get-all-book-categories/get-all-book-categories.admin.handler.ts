import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBookCategoriesAdminRequest } from './get-all-book-categories.admin.request';
import { GetAllBookCategoriesAdminResponse } from './get-all-book-categories.admin.response';
import { BookCategory } from '../../../book-categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBookCategoriesAdminRequest)
export class GetAllBookCategoriesAdminHandler implements IQueryHandler<GetAllBookCategoriesAdminRequest> {
  constructor(
    @InjectRepository(BookCategory)
    private repo: Repository<BookCategory>,
  ) {}

  async execute(query: GetAllBookCategoriesAdminRequest): Promise<GetAllBookCategoriesAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllBookCategoriesAdminResponse, categories, { excludeExtraneousValues: true });
  }
}