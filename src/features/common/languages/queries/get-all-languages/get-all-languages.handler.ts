import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllLanguagesRequest } from './get-all-languages.request';
import { GetAllLanguagesResponse } from './get-all-languages.response';
import { Language } from '../../languages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllLanguagesRequest)
export class GetAllLanguagesHandler implements IQueryHandler<GetAllLanguagesRequest> {
  constructor(
    @InjectRepository(Language)
    private repo: Repository<Language>,
  ) {}

  async execute(query: GetAllLanguagesRequest): Promise<GetAllLanguagesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const languages = await this.repo.find({
      skip: skip,
      take: take,
      order: { id: 'ASC' },
    });

    return plainToInstance(GetAllLanguagesResponse, languages, { excludeExtraneousValues: true });
  }
}