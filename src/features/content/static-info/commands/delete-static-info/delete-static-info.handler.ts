import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteStaticInfoRequest } from './delete-static-info.request';
import { Repository } from 'typeorm';
import { StaticInfo } from '../../static-info.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteStaticInfoRequest)
export class DeleteStaticInfoHandler implements ICommandHandler<DeleteStaticInfoRequest> {
  constructor(@InjectRepository(StaticInfo) private readonly repo: Repository<StaticInfo>) {}

  async execute(cmd: DeleteStaticInfoRequest): Promise<void> {
        const newStaticInfo = await this.repo.findOneBy({ id: cmd.id });
        if (!newStaticInfo) throw new NotFoundException("Static info with given id not found");
        await this.repo.remove(newStaticInfo);
    }

}