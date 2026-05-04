import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllFaqsRequest } from './get-all-faqs.request';
import { GetAllFaqsResponse } from './get-all-faqs.response';
import { Faqs } from '../../faqs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllFaqsRequest)
export class GetAllFaqsHandler implements IQueryHandler<GetAllFaqsRequest> {
  constructor(
    @InjectRepository(Faqs)
    private repo: Repository<Faqs>,
  ) {}

  async execute(query: GetAllFaqsRequest): Promise<GetAllFaqsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await this.repo.find({
      skip: skip,
      take: take,
      relations: ['tags'],
    });

    return plainToInstance(GetAllFaqsResponse, faqs, { excludeExtraneousValues: true });
  }
}