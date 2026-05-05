import { Query } from '@nestjs/cqrs';
import { GetAllDonationsPublicFilters } from './get-all-donations.public.filters';
import { GetAllDonationsPublicResponse } from './get-all-donations.public.response';

export class GetAllDonationsPublicRequest extends Query<GetAllDonationsPublicResponse[]>{
  constructor(public readonly filters: GetAllDonationsPublicFilters) {
    super();
  }
}