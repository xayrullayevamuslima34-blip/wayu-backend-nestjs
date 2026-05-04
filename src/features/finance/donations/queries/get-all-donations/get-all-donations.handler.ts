import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllDonationsRequest } from './get-all-donations.request';
import { GetAllDonationsResponse } from './get-all-donations.response';
import { Donation } from '../../donations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllDonationsRequest)
export class GetAllDonationsHandler implements IQueryHandler<GetAllDonationsRequest> {
  constructor(
    @InjectRepository(Donation)
    private repo: Repository<Donation>,
  ) {}

  async execute(query: GetAllDonationsRequest): Promise<GetAllDonationsResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const donations = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllDonationsResponse, donations, { excludeExtraneousValues: true });
  }
}