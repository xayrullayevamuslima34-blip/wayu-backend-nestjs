import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneLanguagesRequest } from './get-one-languages.request';
import { GetOneLanguagesResponse } from './get-one-languages.response';
import { Language } from '../../languages.entity';

@Injectable()
@QueryHandler(GetOneLanguagesRequest)
export class GetOneLanguagesHandler implements IQueryHandler<GetOneLanguagesRequest> {
  async execute(query: GetOneLanguagesRequest): Promise<GetOneLanguagesResponse> {
    const language = await Language.findOneBy({ id: query.id });
    if (!language) throw new NotFoundException('Language not found');
    return plainToInstance(GetOneLanguagesResponse, language, { excludeExtraneousValues: true });
  }
}