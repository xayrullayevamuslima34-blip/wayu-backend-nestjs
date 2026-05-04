import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateStaticInfoRequest } from './update-static-info.request';
import { UpdateStaticInfoResponse } from './update-static-info.response';
import { StaticInfo } from '../../static-info.entity';

@CommandHandler(UpdateStaticInfoRequest)
export class UpdateStaticInfoHandler implements ICommandHandler<UpdateStaticInfoRequest> {
  async execute(cmd: UpdateStaticInfoRequest): Promise<UpdateStaticInfoResponse> {
    const staticInfo = await StaticInfo.findOne({ where: { id: cmd.id } });
    if (!staticInfo) throw new NotFoundException('Static info not found');

    if (cmd.appStoreLink !== undefined) staticInfo.appStoreLink = cmd.appStoreLink;
    if (cmd.playMarketLink !== undefined) staticInfo.playMarketLink = cmd.playMarketLink;
    if (cmd.aboutUs) staticInfo.aboutUs = cmd.aboutUs;

    await StaticInfo.save(staticInfo);
    return plainToInstance(UpdateStaticInfoResponse, staticInfo, { excludeExtraneousValues: true });
  }
}