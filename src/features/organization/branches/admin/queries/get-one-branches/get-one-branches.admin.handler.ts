import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneBranchesAdminRequest } from './get-one-branches.admin.request';
import { GetOneBranchesAdminResponse } from './get-one-branches.admin.response';
import { Branch } from '../../../branches.entity';

@Injectable()
@QueryHandler(GetOneBranchesAdminRequest)
export class GetOneBranchesAdminHandler implements IQueryHandler<GetOneBranchesAdminRequest> {
  async execute(query: GetOneBranchesAdminRequest): Promise<GetOneBranchesAdminResponse> {
    const branch = await Branch.findOne({
      where: { id: query.id },
      relations: ['country', 'representative'],
    });
    if (!branch) throw new NotFoundException('Branch not found');
    return plainToInstance(GetOneBranchesAdminResponse, branch, { excludeExtraneousValues: true });
  }
}