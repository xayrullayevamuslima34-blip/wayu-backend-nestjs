import { Query } from '@nestjs/cqrs';
import { GetOneApplicationsAdminResponse } from './get-one-applications.admin.response';

export class GetOneApplicationsAdminRequest extends Query<GetOneApplicationsAdminResponse>{
  id!: number;
}