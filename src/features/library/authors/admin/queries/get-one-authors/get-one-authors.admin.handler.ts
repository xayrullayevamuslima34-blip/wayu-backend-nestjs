import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneAuthorsAdminRequest } from './get-one-authors.admin.request';
import { GetOneAuthorsAdminResponse } from './get-one-authors.admin.response';
import { Author } from '../../../authors.entity';

@Injectable()
@QueryHandler(GetOneAuthorsAdminRequest)
export class GetOneAuthorsAdminHandler implements IQueryHandler<GetOneAuthorsAdminRequest> {
  async execute(query: GetOneAuthorsAdminRequest): Promise<GetOneAuthorsAdminResponse> {
    const author = await Author.findOneBy({ id: query.id });
    if (!author) throw new NotFoundException('Author not found');
    return plainToInstance(GetOneAuthorsAdminResponse, author, { excludeExtraneousValues: true });
  }
}