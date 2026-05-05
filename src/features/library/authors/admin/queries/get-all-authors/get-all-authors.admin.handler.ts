import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllAuthorsAdminRequest } from './get-all-authors.admin.request';
import { GetAllAuthorsAdminResponse } from './get-all-authors.admin.response';
import { Author } from '../../../authors.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllAuthorsAdminRequest)
export class GetAllAuthorsAdminHandler implements IQueryHandler<GetAllAuthorsAdminRequest> {
  constructor(
    @InjectRepository(Author)
    private repo: Repository<Author>,
  ) {}

  async execute(query: GetAllAuthorsAdminRequest): Promise<GetAllAuthorsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const authors = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllAuthorsAdminResponse, authors, { excludeExtraneousValues: true });
  }
}