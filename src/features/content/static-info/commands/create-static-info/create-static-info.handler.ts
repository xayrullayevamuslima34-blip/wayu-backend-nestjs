import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateStaticInfoCommand } from './create-static-info.command';
import { CreateStaticInfoResponse } from './create-static-info.response';
import { StaticInfo } from '../../static-info.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateStaticInfoCommand)
export class CreateStaticInfoHandler implements ICommandHandler<CreateStaticInfoCommand> {
  async execute(cmd: CreateStaticInfoCommand): Promise<CreateStaticInfoResponse> {
    const newStaticInfo = StaticInfo.create({
      appStoreLink: cmd.appStoreLink,
      playMarketLink: cmd.playMarketLink,
      aboutUs: cmd.aboutUs,
    });
    await StaticInfo.save(newStaticInfo);
    return plainToInstance(CreateStaticInfoResponse, newStaticInfo, { excludeExtraneousValues: true });
  }

}