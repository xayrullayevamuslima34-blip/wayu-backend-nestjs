import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllDonationsAdminRequest } from './get-all-donations.admin.request';
import { GetAllDonationsAdminResponse } from './get-all-donations.admin.response';
import { Donation } from '../../../donations.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllDonationsAdminRequest)
export class GetAllDonationsAdminHandler implements IQueryHandler<GetAllDonationsAdminRequest> {
  constructor(
    @InjectRepository(Donation)
    private repo: Repository<Donation>,
  ) {}

  async execute(query: GetAllDonationsAdminRequest): Promise<GetAllDonationsAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const donations = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllDonationsAdminResponse, donations, { excludeExtraneousValues: true });
  }
}