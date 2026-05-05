import { Query } from '@nestjs/cqrs';
import { GetAllBranchesAdminResponse } from './get-all-branches.admin.response';
import { GetAllBranchesAdminFilters } from './get-all-branches.admin.filters';

export class GetAllBranchesAdminRequest extends Query<GetAllBranchesAdminResponse[]>{
  constructor(public readonly filters: GetAllBranchesAdminFilters) {
    super();
  }
}