import { Query } from '@nestjs/cqrs';
import { GetOneBranchesAdminResponse } from './get-one-branches.admin.response';

export class GetOneBranchesAdminRequest extends Query<GetOneBranchesAdminResponse>{
  id!: number;
}