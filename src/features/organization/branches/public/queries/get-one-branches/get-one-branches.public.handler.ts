import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBranchesPublicRequest } from './get-one-branches.public.request';
import { GetOneBranchesPublicResponse } from './get-one-branches.public.response';
import { Branch } from '../../../branches.entity';

@Injectable()
@QueryHandler(GetOneBranchesPublicRequest)
export class GetOneBranchesPublicHandler implements IQueryHandler<GetOneBranchesPublicRequest> {
  async execute(query: GetOneBranchesPublicRequest): Promise<GetOneBranchesPublicResponse> {
    const branch = await Branch.findOne({
      where: { id: query.id },
      relations: ['country', 'representative'],
    });
    if (!branch) throw new NotFoundException('Branch not found');
    return plainToInstance(GetOneBranchesPublicResponse, branch, { excludeExtraneousValues: true });
  }
}