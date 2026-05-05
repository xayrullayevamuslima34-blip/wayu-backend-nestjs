import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneAuthorsPublicRequest } from './get-one-authors.public.request';
import { GetOneAuthorsPublicResponse } from './get-one-authors.public.response';
import { Author } from '../../../authors.entity';

@Injectable()
@QueryHandler(GetOneAuthorsPublicRequest)
export class GetOneAuthorsPublicHandler implements IQueryHandler<GetOneAuthorsPublicRequest> {
  async execute(query: GetOneAuthorsPublicRequest): Promise<GetOneAuthorsPublicResponse> {
    const author = await Author.findOneBy({ id: query.id });
    if (!author) throw new NotFoundException('Author not found');
    return plainToInstance(GetOneAuthorsPublicResponse, author, { excludeExtraneousValues: true });
  }
}