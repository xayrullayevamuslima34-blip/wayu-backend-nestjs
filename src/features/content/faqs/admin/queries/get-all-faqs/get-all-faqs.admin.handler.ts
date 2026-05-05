import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllFaqsAdminRequest } from './get-all-faqs.admin.request';
import { GetAllFaqsAdminResponse } from './get-all-faqs.admin.response';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faqs } from '@/features/content/faqs/faqs.entity';

@QueryHandler(GetAllFaqsAdminRequest)
export class GetAllFaqsAdminHandler implements IQueryHandler<GetAllFaqsAdminRequest> {
  constructor(
    @InjectRepository(Faqs)
    private repo: Repository<Faqs>,
  ) {}

  async execute(query: GetAllFaqsAdminRequest): Promise<GetAllFaqsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await this.repo.find({
      skip: skip,
      take: take,
      relations: ['tags'],
    });

    return plainToInstance(GetAllFaqsAdminResponse, faqs, { excludeExtraneousValues: true });
  }
}