import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneLanguagesPublicRequest } from './get-one-languages.public.request';
import { GetOneLanguagesPublicResponse } from './get-one-languages.public.response';
import { Language } from '../../../languages.entity';

@Injectable()
@QueryHandler(GetOneLanguagesPublicRequest)
export class GetOneLanguagesPublicHandler implements IQueryHandler<GetOneLanguagesPublicRequest> {
  async execute(query: GetOneLanguagesPublicRequest): Promise<GetOneLanguagesPublicResponse> {
    const language = await Language.findOneBy({ id: query.id });
    if (!language) throw new NotFoundException('Language not found');
    return plainToInstance(GetOneLanguagesPublicResponse, language, { excludeExtraneousValues: true });
  }
}