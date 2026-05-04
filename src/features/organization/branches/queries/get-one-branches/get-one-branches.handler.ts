import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBranchesRequest } from './get-one-branches.request';
import { GetOneBranchesResponse } from './get-one-branches.response';
import { Branch } from '../../branches.entity';

@Injectable()
@QueryHandler(GetOneBranchesRequest)
export class GetOneBranchesHandler implements IQueryHandler<GetOneBranchesRequest> {
  async execute(query: GetOneBranchesRequest): Promise<GetOneBranchesResponse> {
    const branch = await Branch.findOne({
      where: { id: query.id },
      relations: ['country', 'representative'],
    });
    if (!branch) throw new NotFoundException('Branch not found');
    return plainToInstance(GetOneBranchesResponse, branch, { excludeExtraneousValues: true });
  }
}