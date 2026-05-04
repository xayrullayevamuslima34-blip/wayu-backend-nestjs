import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllAuthorsRequest } from './get-all-authors.request';
import { GetAllAuthorsResponse } from './get-all-authors.response';
import { Author } from '../../authors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllAuthorsRequest)
export class GetAllAuthorsHandler implements IQueryHandler<GetAllAuthorsRequest> {
  constructor(
    @InjectRepository(Author)
    private repo: Repository<Author>,
  ) {}

  async execute(query: GetAllAuthorsRequest): Promise<GetAllAuthorsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const authors = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllAuthorsResponse, authors, { excludeExtraneousValues: true });
  }
}