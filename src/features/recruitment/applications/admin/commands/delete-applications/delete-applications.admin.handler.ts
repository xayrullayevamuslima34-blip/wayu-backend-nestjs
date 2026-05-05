import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { DeleteApplicationsAdminRequest } from './delete-applications.admin.request';
import { Application } from '../../../applications.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteApplicationsAdminRequest)
export class DeleteApplicationsAdminHandler implements ICommandHandler<DeleteApplicationsAdminRequest> {
  constructor(@InjectRepository(Application) private readonly repo: Repository<Application>) {
  }

  async execute(cmd: DeleteApplicationsAdminRequest): Promise<void> {
    const newApplication = await this.repo.findOneBy({ id: cmd.id });
    if (!newApplication) throw new NotFoundException('Application with given id not found');
    await this.repo.remove(newApplication);
  }


}