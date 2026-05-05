import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllAuthorsPublicRequest } from './get-all-authors.public.request';
import { GetAllAuthorsPublicResponse } from './get-all-authors.public.response';
import { Author } from '../../../authors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllAuthorsPublicRequest)
export class GetAllAuthorsPublicHandler implements IQueryHandler<GetAllAuthorsPublicRequest> {
  constructor(
    @InjectRepository(Author)
    private repo: Repository<Author>,
  ) {}

  async execute(query: GetAllAuthorsPublicRequest): Promise<GetAllAuthorsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const authors = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllAuthorsPublicResponse, authors, { excludeExtraneousValues: true });
  }
}