import { Query } from '@nestjs/cqrs';
import { GetAllApplicationsPublicResponse } from './get-all-applications.public.response';
import { GetAllApplicationsPublicFilters } from './get-all-applications.public.filters';

export class GetAllApplicationsPublicRequest extends Query<GetAllApplicationsPublicResponse[]>{
  constructor(public readonly filters: GetAllApplicationsPublicFilters) {
    super();
  }
}