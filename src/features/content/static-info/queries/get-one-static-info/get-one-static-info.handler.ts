import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { GetOneStaticInfoRequest } from './get-one-static-info.request';
import { GetOneStaticInfoResponse } from './get-one-static-info.response';
import { StaticInfo } from '../../static-info.entity';

@Injectable()
@QueryHandler(GetOneStaticInfoRequest)
export class GetOneStaticInfoHandler implements IQueryHandler<GetOneStaticInfoRequest> {
  async execute(query: GetOneStaticInfoRequest): Promise<GetOneStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: query.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');
    return plainToInstance(GetOneStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}