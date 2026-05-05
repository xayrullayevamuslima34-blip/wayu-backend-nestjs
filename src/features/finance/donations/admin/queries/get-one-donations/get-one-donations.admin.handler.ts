import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneDonationsAdminRequest } from './get-one-donations.admin.request';
import { GetOneDonationsAdminResponse } from './get-one-donations.admin.response';
import { Donation } from '../../../donations.entity';

@Injectable()
@QueryHandler(GetOneDonationsAdminRequest)
export class GetOneDonationsAdminHandler implements IQueryHandler<GetOneDonationsAdminRequest> {
  async execute(query: GetOneDonationsAdminRequest): Promise<GetOneDonationsAdminResponse> {
    const donation = await Donation.findOneBy({ id: query.id });
    if (!donation) throw new NotFoundException('Donation not found');
    return plainToInstance(GetOneDonationsAdminResponse, donation, { excludeExtraneousValues: true });
  }
}