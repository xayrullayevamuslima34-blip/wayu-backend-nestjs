import { Query } from '@nestjs/cqrs';
import { GetAllDonationsAdminFilters } from './get-all-donations.admin.filters';
import { GetAllDonationsAdminResponse } from './get-all-donations.admin.response';

export class GetAllDonationsAdminRequest extends Query<GetAllDonationsAdminResponse[]>{
  constructor(public readonly filters: GetAllDonationsAdminFilters) {
    super();
  }
}