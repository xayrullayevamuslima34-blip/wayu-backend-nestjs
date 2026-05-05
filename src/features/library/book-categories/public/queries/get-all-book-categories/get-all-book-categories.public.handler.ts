import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBookCategoriesPublicRequest } from './get-all-book-categories.public.request';
import { GetAllBookCategoriesPublicResponse } from './get-all-book-categories.public.response';
import { BookCategory } from '../../../book-categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBookCategoriesPublicRequest)
export class GetAllBookCategoriesPublicHandler implements IQueryHandler<GetAllBookCategoriesPublicRequest> {
  constructor(
    @InjectRepository(BookCategory)
    private repo: Repository<BookCategory>,
  ) {}

  async execute(query: GetAllBookCategoriesPublicRequest): Promise<GetAllBookCategoriesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const categories = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllBookCategoriesPublicResponse, categories, { excludeExtraneousValues: true });
  }
}