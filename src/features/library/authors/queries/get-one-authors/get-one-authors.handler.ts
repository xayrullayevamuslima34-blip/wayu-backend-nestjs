import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneAuthorsRequest } from './get-one-authors.request';
import { GetOneAuthorsResponse } from './get-one-authors.response';
import { Author } from '../../authors.entity';

@Injectable()
@QueryHandler(GetOneAuthorsRequest)
export class GetOneAuthorsHandler implements IQueryHandler<GetOneAuthorsRequest> {
  async execute(query: GetOneAuthorsRequest): Promise<GetOneAuthorsResponse> {
    const author = await Author.findOneBy({ id: query.id });
    if (!author) throw new NotFoundException('Author not found');
    return plainToInstance(GetOneAuthorsResponse, author, { excludeExtraneousValues: true });
  }
}