import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneBooksAdminRequest } from './get-one-books.admin.request';
import { GetOneBooksAdminResponse } from './get-one-books.admin.response';
import { Book } from '../../../books.entity';

@Injectable()
@QueryHandler(GetOneBooksAdminRequest)
export class GetOneBooksAdminHandler implements IQueryHandler<GetOneBooksAdminRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneBooksAdminRequest): Promise<GetOneBooksAdminResponse> {
    const book = await Book.findOne({
      where: { id: query.id },
      relations: ['author', 'category'],
    });
    if (!book) throw new NotFoundException('Book not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneBooksAdminResponse, book, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${book.image}`;
    res.file = `${baseUrl}/${book.file}`;

    return res;
  }
}