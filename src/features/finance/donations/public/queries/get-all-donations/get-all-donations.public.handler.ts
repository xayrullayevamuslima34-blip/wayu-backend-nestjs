import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllDonationsPublicRequest } from './get-all-donations.public.request';
import { GetAllDonationsPublicResponse } from './get-all-donations.public.response';
import { Donation } from '../../../donations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllDonationsPublicRequest)
export class GetAllDonationsPublicHandler implements IQueryHandler<GetAllDonationsPublicRequest> {
  constructor(
    @InjectRepository(Donation)
    private repo: Repository<Donation>,
  ) {}

  async execute(query: GetAllDonationsPublicRequest): Promise<GetAllDonationsPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const donations = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllDonationsPublicResponse, donations, { excludeExtraneousValues: true });
  }
}