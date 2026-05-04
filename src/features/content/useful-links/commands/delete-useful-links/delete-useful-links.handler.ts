import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteUsefulLinksRequest } from './delete-useful-links.request';
import { Repository } from 'typeorm';
import { UsefulLink } from '../../useful-links.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteUsefulLinksRequest)
export class DeleteUsefulLinksHandler implements ICommandHandler<DeleteUsefulLinksRequest>{
  constructor(@InjectRepository(UsefulLink) private readonly repo: Repository<UsefulLink>) {}

  async execute(cmd: DeleteUsefulLinksRequest): Promise<void> {
        const newUsefulLink = await this.repo.findOneBy({ id: cmd.id });
        if (!newUsefulLink) throw new NotFoundException("Useful link with given id not found");
        await this.repo.remove(newUsefulLink);
    }
}