import { Query } from '@nestjs/cqrs';
import { GetAllBranchesResponse } from './get-all-branches.response';
import { GetAllBranchesFilters } from './get-all-branches.filters';

export class GetAllBranchesRequest extends Query<GetAllBranchesResponse[]>{
  constructor(public readonly filters: GetAllBranchesFilters) {
    super();
  }
}