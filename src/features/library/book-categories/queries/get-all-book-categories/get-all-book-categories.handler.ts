import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBookCategoriesRequest } from './get-all-book-categories.request';
import { GetAllBookCategoriesResponse } from './get-all-book-categories.response';
import { BookCategory } from '../../book-categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBookCategoriesRequest)
export class GetAllBookCategoriesHandler implements IQueryHandler<GetAllBookCategoriesRequest> {
  constructor(
    @InjectRepository(BookCategory)
    private repo: Repository<BookCategory>,
  ) {}

  async execute(query: GetAllBookCategoriesRequest): Promise<GetAllBookCategoriesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllBookCategoriesResponse, categories, { excludeExtraneousValues: true });
  }
}