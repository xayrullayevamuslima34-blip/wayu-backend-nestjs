import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../../static-info.entity';
import {
  GetOneStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/queries/get-one-static-info/get-one-static-info.admin.request';
import {
  GetOneStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/queries/get-one-static-info/get-one-static-info.admin.response';

@Injectable()
@QueryHandler(GetOneStaticInfoAdminRequest)
export class GetOneStaticInfoAdminHandler implements IQueryHandler<GetOneStaticInfoAdminRequest> {
  async execute(query: GetOneStaticInfoAdminRequest): Promise<GetOneStaticInfoAdminResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: query.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');
    return plainToInstance(GetOneStaticInfoAdminResponse, staticInfo, { excludeExtraneousValues: true });
  }
}