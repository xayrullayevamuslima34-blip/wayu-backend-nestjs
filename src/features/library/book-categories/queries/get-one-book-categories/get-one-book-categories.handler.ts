import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBookCategoriesRequest } from './get-one-book-categories.request';
import { GetOneBookCategoriesResponse } from './get-one-book-categories.response';
import { BookCategory } from '../../book-categories.entity';

@Injectable()
@QueryHandler(GetOneBookCategoriesRequest)
export class GetOneBookCategoriesHandler implements IQueryHandler<GetOneBookCategoriesRequest> {
  async execute(query: GetOneBookCategoriesRequest): Promise<GetOneBookCategoriesResponse> {
    const bookCategory = await BookCategory.findOneBy({ id: query.id });
    if (!bookCategory) throw new NotFoundException('Book category not found');
    return plainToInstance(GetOneBookCategoriesResponse, bookCategory, { excludeExtraneousValues: true });
  }
}