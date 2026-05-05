import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateDonationsAdminRequest } from './update-donations.admin.request';
import { UpdateDonationsAdminResponse } from './update-donations.admin.response';
import { Donation } from '../../../donations.entity';

@CommandHandler(UpdateDonationsAdminRequest)
export class UpdateDonationsAdminHandler implements ICommandHandler<UpdateDonationsAdminRequest> {
  async execute(cmd: UpdateDonationsAdminRequest): Promise<UpdateDonationsAdminResponse> {
    const donation = await Donation.findOne({ where: { id: cmd.id } });
    if (!donation) throw new NotFoundException('Donation not found');

    if (cmd.amount !== undefined) donation.amount = cmd.amount;
    if (cmd.fullName) donation.fullName = cmd.fullName;
    if (cmd.date) donation.date = cmd.date;
    if (cmd.paidBy) donation.paidBy = cmd.paidBy;

    await Donation.save(donation);
    return plainToInstance(UpdateDonationsAdminResponse, donation, { excludeExtraneousValues: true });
  }
}