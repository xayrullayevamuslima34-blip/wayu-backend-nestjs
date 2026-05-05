import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneDonationsPublicRequest } from './get-one-donations.public.request';
import { GetOneDonationsPublicResponse } from './get-one-donations.public.response';
import { Donation } from '../../../donations.entity';

@Injectable()
@QueryHandler(GetOneDonationsPublicRequest)
export class GetOneDonationsPublicHandler implements IQueryHandler<GetOneDonationsPublicRequest> {
  async execute(query: GetOneDonationsPublicRequest): Promise<GetOneDonationsPublicResponse> {
    const donation = await Donation.findOneBy({ id: query.id });
    if (!donation) throw new NotFoundException('Donation not found');
    return plainToInstance(GetOneDonationsPublicResponse, donation, { excludeExtraneousValues: true });
  }
}