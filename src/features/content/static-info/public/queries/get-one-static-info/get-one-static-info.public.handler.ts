import { Injectable, NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { StaticInfo } from '../../../static-info.entity';
import {
  GetOneStaticInfoPublicRequest
} from '@/features/content/static-info/public/queries/get-one-static-info/get-one-static-info.public.request';
import {
  GetOneStaticInfoPublicResponse
} from '@/features/content/static-info/public/queries/get-one-static-info/get-one-static-info.public.response';

@Injectable()
@QueryHandler(GetOneStaticInfoPublicRequest)
export class GetOneStaticInfoPublicHandler implements IQueryHandler<GetOneStaticInfoPublicRequest> {
  async execute(query: GetOneStaticInfoPublicRequest): Promise<GetOneStaticInfoPublicResponse> {
    const staticInfo = await StaticInfo.findOneBy({ id: query.id });
    if (!staticInfo) throw new NotFoundException('Static info not found');
    return plainToInstance(GetOneStaticInfoPublicResponse, staticInfo, { excludeExtraneousValues: true });
  }
}