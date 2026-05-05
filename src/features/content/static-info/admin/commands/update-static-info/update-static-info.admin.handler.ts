import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  UpdateStaticInfoAdminRequest
} from '@/features/content/static-info/admin/commands/update-static-info/update-static-info.admin.request';
import { StaticInfo } from '@/features/content/static-info/static-info.entity';
import {
  UpdateStaticInfoAdminResponse
} from '@/features/content/static-info/admin/commands/update-static-info/update-static-info.admin.response';

@CommandHandler(UpdateStaticInfoAdminRequest)
export class UpdateStaticInfoAdminHandler implements ICommandHandler<UpdateStaticInfoAdminRequest> {
  async execute(cmd: UpdateStaticInfoAdminRequest): Promise<UpdateStaticInfoAdminResponse> {
    const staticInfo = await StaticInfo.findOne({ where: { id: cmd.id } });
    if (!staticInfo) throw new NotFoundException('Static info not found');

    if (cmd.appStoreLink !== undefined) staticInfo.appStoreLink = cmd.appStoreLink;
    if (cmd.playMarketLink !== undefined) staticInfo.playMarketLink = cmd.playMarketLink;
    if (cmd.aboutUs) staticInfo.aboutUs = cmd.aboutUs;

    await StaticInfo.save(staticInfo);
    return plainToInstance(UpdateStaticInfoAdminResponse, staticInfo, { excludeExtraneousValues: true });
  }
}