import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDonationsAdminCommand } from './create-donations.admin.command';
import { CreateDonationsAdminResponse } from './create-donations.admin.response';
import { Donation } from '../../../donations.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateDonationsAdminCommand)
export class CreateDonationsAdminHandler implements ICommandHandler<CreateDonationsAdminCommand> {
    async execute(cmd: CreateDonationsAdminCommand): Promise<CreateDonationsAdminResponse> {
        const newDonation = Donation.create({
          amount: cmd.amount,
          fullName: cmd.fullName,
          date: cmd.date,
          paidBy: cmd.paidBy,
        })
      await Donation.save(newDonation);
        return plainToInstance(CreateDonationsAdminResponse, newDonation, {excludeExtraneousValues: true});
    }

}