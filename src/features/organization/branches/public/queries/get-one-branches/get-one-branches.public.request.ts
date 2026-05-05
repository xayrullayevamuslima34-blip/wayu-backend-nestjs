import { Query } from '@nestjs/cqrs';
import { GetOneBranchesPublicResponse } from './get-one-branches.public.response';

export class GetOneBranchesPublicRequest extends Query<GetOneBranchesPublicResponse>{
  id!: number;
}