import { Query } from '@nestjs/cqrs';
import { GetOneDonationsAdminResponse } from './get-one-donations.admin.response';

export class GetOneDonationsAdminRequest extends Query<GetOneDonationsAdminResponse>{
  id!: number;
}