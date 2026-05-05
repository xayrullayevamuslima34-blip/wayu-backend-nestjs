import { Query } from '@nestjs/cqrs';
import { GetOneApplicationsPublicResponse } from './get-one-applications.public.response';

export class GetOneApplicationsPublicRequest extends Query<GetOneApplicationsPublicResponse>{
  id!: number;
}