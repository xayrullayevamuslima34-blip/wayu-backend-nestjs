import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { ConfigService } from '@nestjs/config';
import { GetAllBooksPublicRequest } from './get-all-books.public.request';
import { GetAllBooksPublicResponse } from './get-all-books.public.response';
import { Book } from '../../../books.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBooksPublicRequest)
export class GetAllBooksPublicHandler implements IQueryHandler<GetAllBooksPublicRequest> {
  constructor(
    @InjectRepository(Book)
    private repo: Repository<Book>,
    private readonly config: ConfigService,
  ) {}

  async execute(query: GetAllBooksPublicRequest): Promise<GetAllBooksPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const books = await this.repo.find({
      relations: ['author', 'category'],
      skip: skip,
      take: take,
    });

    const baseUrl = this.config.get<string>('BASE_URL');

    return books.map((book) => {
      const res = plainToInstance(GetAllBooksPublicResponse, book, { excludeExtraneousValues: true });
      res.image = `${baseUrl}/${book.image}`;
      res.file = `${baseUrl}/${book.file}`;
      return res;
    });
  }
}