import { Query } from '@nestjs/cqrs';
import { GetAllBranchesPublicResponse } from './get-all-branches.public.response';
import { GetAllBranchesPublicFilters } from './get-all-branches.public.filters';

export class GetAllBranchesPublicRequest extends Query<GetAllBranchesPublicResponse[]>{
  constructor(public readonly filters: GetAllBranchesPublicFilters) {
    super();
  }
}