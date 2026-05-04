import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateDonationsRequest } from './update-donations.request';
import { UpdateDonationsResponse } from './update-donations.response';
import { Donation } from '../../donations.entity';

@CommandHandler(UpdateDonationsRequest)
export class UpdateDonationsHandler implements ICommandHandler<UpdateDonationsRequest> {
  async execute(cmd: UpdateDonationsRequest): Promise<UpdateDonationsResponse> {
    const donation = await Donation.findOne({ where: { id: cmd.id } });
    if (!donation) throw new NotFoundException('Donation not found');

    if (cmd.amount !== undefined) donation.amount = cmd.amount;
    if (cmd.fullName) donation.fullName = cmd.fullName;
    if (cmd.date) donation.date = cmd.date;
    if (cmd.paidBy) donation.paidBy = cmd.paidBy;

    await Donation.save(donation);
    return plainToInstance(UpdateDonationsResponse, donation, { excludeExtraneousValues: true });
  }
}