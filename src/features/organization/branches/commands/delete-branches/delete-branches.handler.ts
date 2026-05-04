import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBranchesRequest } from './delete-branches.request';
import { Repository } from 'typeorm';
import { Branch } from '../../branches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(Branch)
export class DeleteBranchesHandler implements ICommandHandler<DeleteBranchesRequest> {
  constructor(@InjectRepository(Branch) private repo: Repository<Branch>) {
  }

  async execute(cmd: DeleteBranchesRequest): Promise<void> {
    const newBranch = await this.repo.findOneBy({ id: cmd.id });
    if (!newBranch) throw new NotFoundException('Branch with given id not found');
    await this.repo.remove(newBranch);
  }
}