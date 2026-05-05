import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetOneBooksPublicRequest } from './get-one-books.public.request';
import { GetOneBooksPublicResponse } from './get-one-books.public.response';
import { Book } from '../../../books.entity';

@Injectable()
@QueryHandler(GetOneBooksPublicRequest)
export class GetOneBooksPublicHandler implements IQueryHandler<GetOneBooksPublicRequest> {
  constructor(private readonly config: ConfigService) {}

  async execute(query: GetOneBooksPublicRequest): Promise<GetOneBooksPublicResponse> {
    const book = await Book.findOne({
      where: { id: query.id },
      relations: ['author', 'category'],
    });
    if (!book) throw new NotFoundException('Book not found');

    const baseUrl = this.config.get<string>('BASE_URL');
    const res = plainToInstance(GetOneBooksPublicResponse, book, { excludeExtraneousValues: true });
    res.image = `${baseUrl}/${book.image}`;
    res.file = `${baseUrl}/${book.file}`;

    return res;
  }
}