import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../../static-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllStaticInfoPublicRequest,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.request';
import {
  GetAllStaticInfoPublicResponse,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.response';

@QueryHandler(GetAllStaticInfoPublicRequest)
export class GetAllStaticInfoPublicHandler implements IQueryHandler<GetAllStaticInfoPublicRequest> {
  constructor(
    @InjectRepository(StaticInfo)
    private repo: Repository<StaticInfo>,
  ) {
  }

  async execute(query: GetAllStaticInfoPublicRequest): Promise<GetAllStaticInfoPublicResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const staticInfoList = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllStaticInfoPublicResponse, staticInfoList, { excludeExtraneousValues: true });
  }
}