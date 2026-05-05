import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteStaticInfoAdminRequest
} from '@/features/content/static-info/admin/commands/delete-static-info/delete-static-info.admin.request';
import { StaticInfo } from '@/features/content/static-info/static-info.entity';

@CommandHandler(DeleteStaticInfoAdminRequest)
export class DeleteStaticInfoAdminHandler implements ICommandHandler<DeleteStaticInfoAdminRequest> {
  constructor(@InjectRepository(StaticInfo) private readonly repo: Repository<StaticInfo>) {}

  async execute(cmd: DeleteStaticInfoAdminRequest): Promise<void> {
        const newStaticInfo = await this.repo.findOneBy({ id: cmd.id });
        if (!newStaticInfo) throw new NotFoundException("Static info with given id not found");
        await this.repo.remove(newStaticInfo);
    }

}