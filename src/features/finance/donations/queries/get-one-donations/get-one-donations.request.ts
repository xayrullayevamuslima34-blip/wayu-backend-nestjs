import { Query } from '@nestjs/cqrs';
import { GetOneDonationsResponse } from './get-one-donations.response';

export class GetOneDonationsRequest extends Query<GetOneDonationsResponse>{
  id!: number;
}