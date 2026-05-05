import { Query } from '@nestjs/cqrs';
import { GetOneDonationsPublicResponse } from './get-one-donations.public.response';

export class GetOneDonationsPublicRequest extends Query<GetOneDonationsPublicResponse>{
  id!: number;
}