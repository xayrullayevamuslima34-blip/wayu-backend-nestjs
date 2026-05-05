import { Query } from '@nestjs/cqrs';
import { GetAllRepresentativesAdminResponse } from './get-all-representatives.admin.response';
import { GetAllRepresentativesAdminFilters } from './get-all-representatives.admin.filters';

export class GetAllRepresentativesAdminRequest extends Query<GetAllRepresentativesAdminResponse[]>{
  constructor(public readonly filters: GetAllRepresentativesAdminFilters) {
    super();
  }
}