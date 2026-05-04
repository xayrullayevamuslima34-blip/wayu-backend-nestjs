import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsResponse } from './get-all-applications.response';
import { GetAllApplicationsFilters } from './get-all-applications.filters';

export class GetAllApplicationsRequest extends Query<GetAllApplicationsResponse[]>{
  constructor(public readonly filters: GetAllApplicationsFilters) {
    super();
  }
}