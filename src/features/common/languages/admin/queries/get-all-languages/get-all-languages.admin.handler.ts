import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllLanguagesAdminRequest } from './get-all-languages.admin.request';
import { GetAllLanguagesAdminResponse } from './get-all-languages.admin.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Language } from '@/features/common/languages/languages.entity';

@QueryHandler(GetAllLanguagesAdminRequest)
export class GetAllLanguagesAdminHandler implements IQueryHandler<GetAllLanguagesAdminRequest> {
  constructor(
    @InjectRepository(Language)
    private repo: Repository<Language>,
  ) {}

  async execute(query: GetAllLanguagesAdminRequest): Promise<GetAllLanguagesAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const languages = await this.repo.find({
      skip: skip,
      take: take,
      order: { id: 'ASC' },
    });

    return plainToInstance(GetAllLanguagesAdminResponse, languages, { excludeExtraneousValues: true });
  }
}