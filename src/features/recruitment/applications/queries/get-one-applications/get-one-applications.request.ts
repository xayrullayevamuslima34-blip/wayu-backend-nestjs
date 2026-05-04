import { Query } from '@nestjs/cqrs';
import { GetOneApplicationsResponse } from './get-one-applications.response';

export class GetOneApplicationsRequest extends Query<GetOneApplicationsResponse>{
  id!: number;
}