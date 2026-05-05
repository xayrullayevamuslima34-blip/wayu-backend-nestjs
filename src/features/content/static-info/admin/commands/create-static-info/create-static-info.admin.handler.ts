import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  CreateStaticInfoAdminCommand,
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.command';
import { StaticInfo } from '@/features/content/static-info/static-info.entity';
import {
  CreateStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.response';

@CommandHandler(CreateStaticInfoAdminCommand)
export class CreateStaticInfoAdminHandler implements ICommandHandler<CreateStaticInfoAdminCommand> {
  async execute(cmd: CreateStaticInfoAdminCommand): Promise<CreateStaticInfoAdminResponse> {
    const newStaticInfo = StaticInfo.create({
      appStoreLink: cmd.appStoreLink,
      playMarketLink: cmd.playMarketLink,
      aboutUs: cmd.aboutUs,
    });
    await StaticInfo.save(newStaticInfo);
    return plainToInstance(CreateStaticInfoAdminResponse, newStaticInfo, { excludeExtraneousValues: true });
  }

}