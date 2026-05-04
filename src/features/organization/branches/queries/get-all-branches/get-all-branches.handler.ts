import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBranchesRequest } from './get-all-branches.request';
import { GetAllBranchesResponse } from './get-all-branches.response';
import { Branch } from '../../branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBranchesRequest)
export class GetAllBranchesHandler implements IQueryHandler<GetAllBranchesRequest> {
  constructor(
    @InjectRepository(Branch)
    private repo: Repository<Branch>,
  ) {}

  async execute(query: GetAllBranchesRequest): Promise<GetAllBranchesResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const branches = await this.repo.find({
      relations: ['country', 'representative'],
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllBranchesResponse, branches, { excludeExtraneousValues: true });
  }
}