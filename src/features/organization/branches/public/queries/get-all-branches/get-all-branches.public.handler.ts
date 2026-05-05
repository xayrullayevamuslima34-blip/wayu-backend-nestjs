import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllBranchesPublicRequest } from './get-all-branches.public.request';
import { GetAllBranchesPublicResponse } from './get-all-branches.public.response';
import { Branch } from '../../../branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllBranchesPublicRequest)
export class GetAllBranchesPublicHandler implements IQueryHandler<GetAllBranchesPublicRequest> {
  constructor(
    @InjectRepository(Branch)
    private repo: Repository<Branch>,
  ) {}

  async execute(query: GetAllBranchesPublicRequest): Promise<GetAllBranchesPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const branches = await this.repo.find({
      relations: ['country', 'representative'],
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllBranchesPublicResponse, branches, { excludeExtraneousValues: true });
  }
}