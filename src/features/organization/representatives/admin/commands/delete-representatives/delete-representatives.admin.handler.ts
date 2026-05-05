import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRepresentativesAdminRequest } from './delete-representatives.admin.request';
import { Repository } from 'typeorm';
import { Representative } from '../../../representatives.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRepresentativesAdminRequest)
export class DeleteRepresentativesAdminHandler implements ICommandHandler<DeleteRepresentativesAdminRequest> {
  constructor(@InjectRepository(Representative) private readonly repo: Repository<Representative>) {
  }

  async execute(cmd: DeleteRepresentativesAdminRequest): Promise<void> {
    const newRepresentative = await this.repo.findOneBy({ id: cmd.id });
    if (!newRepresentative) throw new NotFoundException('Representative with given id not found');
    await this.repo.remove(newRepresentative);
  }
}