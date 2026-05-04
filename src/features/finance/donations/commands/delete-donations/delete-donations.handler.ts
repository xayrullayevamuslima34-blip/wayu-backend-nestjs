import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteDonationsRequest } from './delete-donations.request';
import { Repository } from 'typeorm';
import { Donation } from '../../donations.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteDonationsRequest)
export class DeleteDonationsHandler implements ICommandHandler<DeleteDonationsRequest> {
  constructor(@InjectRepository(Donation) private readonly repo: Repository<Donation>) {
  }

  async execute(cmd: DeleteDonationsRequest): Promise<void> {
    const newDonation = await this.repo.findOneBy({ id: cmd.id });
    if (!newDonation) throw new NotFoundException(`Could not find donation with id ${cmd.id}`);
    await this.repo.remove(newDonation);
  }

}