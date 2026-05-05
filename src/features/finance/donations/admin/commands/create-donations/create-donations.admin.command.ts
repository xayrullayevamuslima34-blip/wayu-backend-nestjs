import { Command } from '@nestjs/cqrs';
import { CreateDonationsAdminResponse } from './create-donations.admin.response';
import { PaymentProvider } from '@/core/enums/paymentProvider.enum';

export class CreateDonationsAdminCommand extends Command<CreateDonationsAdminResponse>{
  constructor(
    public amount: number,
    public fullName: string,
    public date: Date,
    public paidBy: PaymentProvider,
  ) {
    super();
  }
}