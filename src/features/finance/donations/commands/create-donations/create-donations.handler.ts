import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateDonationsCommand } from './create-donations.command';
import { CreateDonationsResponse } from './create-donations.response';
import { Donation } from '../../donations.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateDonationsCommand)
export class CreateDonationsHandler implements ICommandHandler<CreateDonationsCommand> {
    async execute(cmd: CreateDonationsCommand): Promise<CreateDonationsResponse> {
        const newDonation = Donation.create({
          amount: cmd.amount,
          fullName: cmd.fullName,
          date: cmd.date,
          paidBy: cmd.paidBy,
        })
      await Donation.save(newDonation);
        return plainToInstance(CreateDonationsResponse, newDonation, {excludeExtraneousValues: true});
    }

}