import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../../static-info.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  GetAllStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.request';
import {
  GetAllStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.response';

@QueryHandler(GetAllStaticInfoAdminRequest)
export class GetAllStaticInfoAdminHandler implements IQueryHandler<GetAllStaticInfoAdminRequest> {
  constructor(
    @InjectRepository(StaticInfo)
    private repo: Repository<StaticInfo>,
  ) {
  }

  async execute(query: GetAllStaticInfoAdminRequest): Promise<GetAllStaticInfoAdminResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const staticInfoList = await this.repo.find({
      skip: skip,
      take: take,
    });

    return plainToInstance(GetAllStaticInfoAdminResponse, staticInfoList, { excludeExtraneousValues: true });
  }
}