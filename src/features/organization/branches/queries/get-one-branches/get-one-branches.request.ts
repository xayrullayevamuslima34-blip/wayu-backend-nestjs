import { Query } from '@nestjs/cqrs';
import { GetOneBranchesResponse } from './get-one-branches.response';

export class GetOneBranchesRequest extends Query<GetOneBranchesResponse>{
  id!: number;
}