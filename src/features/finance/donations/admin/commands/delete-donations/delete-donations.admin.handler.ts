import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDonationsAdminRequest } from './delete-donations.admin.request';
import { Repository } from 'typeorm';
import { Donation } from '../../../donations.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteDonationsAdminRequest)
export class DeleteDonationsAdminHandler implements ICommandHandler<DeleteDonationsAdminRequest> {
  constructor(@InjectRepository(Donation) private readonly repo: Repository<Donation>) {
  }

  async execute(cmd: DeleteDonationsAdminRequest): Promise<void> {
    const newDonation = await this.repo.findOneBy({ id: cmd.id });
    if (!newDonation) throw new NotFoundException(`Could not find donation with id ${cmd.id}`);
    await this.repo.remove(newDonation);
  }

}