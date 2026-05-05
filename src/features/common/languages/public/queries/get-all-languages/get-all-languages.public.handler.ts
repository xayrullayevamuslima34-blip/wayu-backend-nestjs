import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllLanguagesPublicRequest } from './get-all-languages.public.request';
import { GetAllLanguagesPublicResponse } from './get-all-languages.public.response';
import { Language } from '../../../languages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllLanguagesPublicRequest)
export class GetAllLanguagesPublicHandler implements IQueryHandler<GetAllLanguagesPublicRequest> {
  constructor(
    @InjectRepository(Language)
    private repo: Repository<Language>,
  ) {}

  async execute(query: GetAllLanguagesPublicRequest): Promise<GetAllLanguagesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const languages = await this.repo.find({
      skip: skip,
      take: take,
      order: { id: 'ASC' },
    });

    return plainToInstance(GetAllLanguagesPublicResponse, languages, { excludeExtraneousValues: true });
  }
}