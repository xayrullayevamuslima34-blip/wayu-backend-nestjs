import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBranchesAdminRequest } from './delete-branches.admin.request';
import { Repository } from 'typeorm';
import { Branch } from '../../../branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(Branch)
export class DeleteBranchesAdminHandler implements ICommandHandler<DeleteBranchesAdminRequest> {
  constructor(@InjectRepository(Branch) private repo: Repository<Branch>) {
  }

  async execute(cmd: DeleteBranchesAdminRequest): Promise<void> {
    const newBranch = await this.repo.findOneBy({ id: cmd.id });
    if (!newBranch) throw new NotFoundException('Branch with given id not found');
    await this.repo.remove(newBranch);
  }
}