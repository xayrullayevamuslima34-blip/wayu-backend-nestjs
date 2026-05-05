import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllFaqsPublicRequest } from './get-all-faqs.public.request';
import { GetAllFaqsPublicResponse } from './get-all-faqs.public.response';
import { Faqs } from '../../../faqs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllFaqsPublicRequest)
export class GetAllFaqsPublicHandler implements IQueryHandler<GetAllFaqsPublicRequest> {
  constructor(
    @InjectRepository(Faqs)
    private repo: Repository<Faqs>,
  ) {}

  async execute(query: GetAllFaqsPublicRequest): Promise<GetAllFaqsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const faqs = await this.repo.find({
      skip: skip,
      take: take,
      relations: ['tags'],
    });

    return plainToInstance(GetAllFaqsPublicResponse, faqs, { excludeExtraneousValues: true });
  }
}