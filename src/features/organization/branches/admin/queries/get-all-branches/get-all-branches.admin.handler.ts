import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBranchesAdminRequest } from './get-all-branches.admin.request';
import { GetAllBranchesAdminResponse } from './get-all-branches.admin.response';
import { Branch } from '../../../branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBranchesAdminRequest)
export class GetAllBranchesAdminHandler implements IQueryHandler<GetAllBranchesAdminRequest> {
  constructor(
    @InjectRepository(Branch)
    private repo: Repository<Branch>,
  ) {}

  async execute(query: GetAllBranchesAdminRequest): Promise<GetAllBranchesAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const branches = await this.repo.find({
      relations: ['country', 'representative'],
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllBranchesAdminResponse, branches, { excludeExtraneousValues: true });
  }
}