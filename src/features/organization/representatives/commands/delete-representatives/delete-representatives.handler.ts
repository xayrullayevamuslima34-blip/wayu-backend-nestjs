import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteRepresentativesRequest } from './delete-representatives.request';
import { Repository } from 'typeorm';
import { Representative } from '../../representatives.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteRepresentativesRequest)
export class DeleteRepresentativesHandler implements ICommandHandler<DeleteRepresentativesRequest> {
  constructor(@InjectRepository(Representative) private readonly repo: Repository<Representative>) {
  }

  async execute(cmd: DeleteRepresentativesRequest): Promise<void> {
    const newRepresentative = await this.repo.findOneBy({ id: cmd.id });
    if (!newRepresentative) throw new NotFoundException('Representative with given id not found');
    await this.repo.remove(newRepresentative);
  }
}