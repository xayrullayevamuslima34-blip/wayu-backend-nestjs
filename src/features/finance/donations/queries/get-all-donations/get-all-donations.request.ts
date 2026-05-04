import { Query } from '@nestjs/cqrs';
import { GetAllDonationsFilters } from './get-all-donations.filters';
import { GetAllDonationsResponse } from './get-all-donations.response';

export class GetAllDonationsRequest extends Query<GetAllDonationsResponse[]>{
  constructor(public readonly filters: GetAllDonationsFilters) {
    super();
  }
}