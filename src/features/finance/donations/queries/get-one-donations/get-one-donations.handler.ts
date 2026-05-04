import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneDonationsRequest } from './get-one-donations.request';
import { GetOneDonationsResponse } from './get-one-donations.response';
import { Donation } from '../../donations.entity';

@Injectable()
@QueryHandler(GetOneDonationsRequest)
export class GetOneDonationsHandler implements IQueryHandler<GetOneDonationsRequest> {
  async execute(query: GetOneDonationsRequest): Promise<GetOneDonationsResponse> {
    const donation = await Donation.findOneBy({ id: query.id });
    if (!donation) throw new NotFoundException('Donation not found');
    return plainToInstance(GetOneDonationsResponse, donation, { excludeExtraneousValues: true });
  }
}