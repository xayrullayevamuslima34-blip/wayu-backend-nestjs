import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsAdminResponse } from './get-all-applications.admin.response';
import { GetAllApplicationsAdminFilters } from './get-all-applications.admin.filters';

export class GetAllApplicationsAdminRequest extends Query<GetAllApplicationsAdminResponse[]>{
  constructor(public readonly filters: GetAllApplicationsAdminFilters) {
    super();
  }
}