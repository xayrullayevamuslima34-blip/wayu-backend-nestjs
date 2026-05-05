import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBookCategoriesAdminRequest } from './get-one-book-categories.admin.request';
import { GetOneBookCategoriesAdminResponse } from './get-one-book-categories.admin.response';
import { BookCategory } from '../../../book-categories.entity';

@Injectable()
@QueryHandler(GetOneBookCategoriesAdminRequest)
export class GetOneBookCategoriesAdminHandler implements IQueryHandler<GetOneBookCategoriesAdminRequest> {
  async execute(query: GetOneBookCategoriesAdminRequest): Promise<GetOneBookCategoriesAdminResponse> {
    const bookCategory = await BookCategory.findOneBy({ id: query.id });
    if (!bookCategory) throw new NotFoundException('Book category not found');
    return plainToInstance(GetOneBookCategoriesAdminResponse, bookCategory, { excludeExtraneousValues: true });
  }
}