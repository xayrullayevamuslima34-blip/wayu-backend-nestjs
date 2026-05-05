import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneLanguagesAdminRequest } from './get-one-languages.admin.request';
import { GetOneLanguagesAdminResponse } from './get-one-languages.admin.response';
import { Language } from '@/features/common/languages/languages.entity';

@Injectable()
@QueryHandler(GetOneLanguagesAdminRequest)
export class GetOneLanguagesAdminHandler implements IQueryHandler<GetOneLanguagesAdminRequest> {
  async execute(query: GetOneLanguagesAdminRequest): Promise<GetOneLanguagesAdminResponse> {
    const language = await Language.findOneBy({ id: query.id });
    if (!language) throw new NotFoundException('Language not found');
    return plainToInstance(GetOneLanguagesAdminResponse, language, { excludeExtraneousValues: true });
  }
}