import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { DeleteApplicationsRequest } from './delete-applications.request';
import { Application } from '../../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteApplicationsRequest)
export class DeleteApplicationsHandler implements ICommandHandler<DeleteApplicationsRequest> {
  constructor(@InjectRepository(Application) private readonly repo: Repository<Application>) {
  }

  async execute(cmd: DeleteApplicationsRequest): Promise<void> {
    const newApplication = await this.repo.findOneBy({ id: cmd.id });
    if (!newApplication) throw new NotFoundException('Application with given id not found');
    await this.repo.remove(newApplication);
  }


}