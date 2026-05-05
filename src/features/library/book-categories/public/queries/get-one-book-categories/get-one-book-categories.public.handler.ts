import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBookCategoriesPublicRequest } from './get-one-book-categories.public.request';
import { GetOneBookCategoriesPublicResponse } from './get-one-book-categories.public.response';
import { BookCategory } from '../../../book-categories.entity';

@Injectable()
@QueryHandler(GetOneBookCategoriesPublicRequest)
export class GetOneBookCategoriesPublicHandler implements IQueryHandler<GetOneBookCategoriesPublicRequest> {
  async execute(query: GetOneBookCategoriesPublicRequest): Promise<GetOneBookCategoriesPublicResponse> {
    const bookCategory = await BookCategory.findOneBy({ id: query.id });
    if (!bookCategory) throw new NotFoundException('Book category not found');
    return plainToInstance(GetOneBookCategoriesPublicResponse, bookCategory, { excludeExtraneousValues: true });
  }
}