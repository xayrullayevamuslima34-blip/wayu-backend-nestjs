import { Command } from '@nestjs/cqrs';
import { CreateDonationsResponse } from './create-donations.response';
import { PaymentProvider } from '../../../../../core/enums/paymentProvider.enum';

export class CreateDonationsCommand extends Command<CreateDonationsResponse>{
  constructor(
    public amount: number,
    public fullName: string,
    public date: Date,
    public paidBy: PaymentProvider,
  ) {
    super();
  }
}