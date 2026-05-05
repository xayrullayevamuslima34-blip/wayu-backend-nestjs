import { Query } from '@nestjs/cqrs';
import { GetOneRepresentativesAdminResponse } from './get-one-representatives.admin.response';

export class GetOneRepresentativesAdminRequest extends Query<GetOneRepresentativesAdminResponse>{
  id!: number;
}