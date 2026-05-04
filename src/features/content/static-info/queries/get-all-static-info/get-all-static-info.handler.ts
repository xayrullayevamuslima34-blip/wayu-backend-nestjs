import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetAllStaticInfoRequest } from './get-all-static-info.request';
import { GetAllStaticInfoResponse } from './get-all-static-info.response';
import { StaticInfo } from '../../static-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@QueryHandler(GetAllStaticInfoRequest)
export class GetAllStaticInfoHandler implements IQueryHandler<GetAllStaticInfoRequest> {
  constructor(
    @InjectRepository(StaticInfo)
    private repo: Repository<StaticInfo>,
  ) {}

  async execute(query: GetAllStaticInfoRequest): Promise<GetAllStaticInfoResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const staticInfoList = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllStaticInfoResponse, staticInfoList, { excludeExtraneousValues: true });
  }
}