import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donations/donations.entity';
import { Expense } from './expenses/expenses.entity';
import { ConfigModule } from '@nestjs/config';
import { DonationsController } from './donations/donations.controller';
import { EventsController } from '../events/events/events.controller';
import { GetAllDonationsHandler } from './donations/queries/get-all-donations/get-all-donations.handler';
import { GetOneDonationsHandler } from './donations/queries/get-one-donations/get-one-donations.handler';
import { CreateDonationsHandler } from './donations/commands/create-donations/create-donations.handler';
import { UpdateDonationsHandler } from './donations/commands/update-donations/update-donations.handler';
import { DeleteDonationsHandler } from './donations/commands/delete-donations/delete-donations.handler';
import { GetAllExpensesHandler } from './expenses/queries/get-all-expenses/get-all-expenses.handler';
import { GetOneExpensesHandler } from './expenses/queries/get-one-expenses/get-one-expenses.handler';
import { CreateExpensesHandler } from './expenses/commands/create-expenses/create-expenses.handler';
import { UpdateExpensesHandler } from './expenses/commands/update-expenses/update-expenses.handler';
import { DeleteExpensesHandler } from './expenses/commands/delete-expenses/delete-expenses.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, Expense]),
    ConfigModule],

  controllers: [DonationsController, EventsController],

  providers: [
    GetAllDonationsHandler,
    GetOneDonationsHandler,
    CreateDonationsHandler,
    UpdateDonationsHandler,
    DeleteDonationsHandler,
    GetAllExpensesHandler,
    GetOneExpensesHandler,
    CreateExpensesHandler,
    UpdateExpensesHandler,
    DeleteExpensesHandler,
  ],
})

export class FinanceModule {
}