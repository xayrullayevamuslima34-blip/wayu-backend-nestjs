import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donation } from './donations/donations.entity';
import { Expense } from './expenses/expenses.entity';
import { ConfigModule } from '@nestjs/config';
import { GetAllDonationsAdminHandler } from './donations/admin/queries/get-all-donations/get-all-donations.admin.handler';
import { GetOneDonationsAdminHandler } from './donations/admin/queries/get-one-donations/get-one-donations.admin.handler';
import { CreateDonationsAdminHandler } from './donations/admin/commands/create-donations/create-donations.admin.handler';
import { UpdateDonationsAdminHandler } from './donations/admin/commands/update-donations/update-donations.admin.handler';
import { DeleteDonationsAdminHandler } from './donations/admin/commands/delete-donations/delete-donations.admin.handler';
import { GetAllExpensesAdminHandler } from './expenses/admin/queries/get-all-expenses/get-all-expenses.admin.handler';
import { GetOneExpensesAdminHandler } from './expenses/admin/queries/get-one-expenses/get-one-expenses.admin.handler';
import { CreateExpensesAdminHandler } from './expenses/admin/commands/create-expenses/create-expenses.admin.handler';
import { UpdateExpensesAdminHandler } from './expenses/admin/commands/update-expenses/update-expenses.admin.handler';
import { DeleteExpensesAdminHandler } from './expenses/admin/commands/delete-expenses/delete-expenses.admin.handler';
import { DonationsAdminController, DonationsPublicController } from '@/features/finance/donations/donations.controller';
import { EventsAdminController, EventsPublicController } from '@/features/events/events/events.controller';
import {
  GetOneDonationsPublicHandler
} from '@/features/finance/donations/public/queries/get-one-donations/get-one-donations.public.handler';
import {
  GetAllDonationsPublicHandler
} from '@/features/finance/donations/public/queries/get-all-donations/get-all-donations.public.handler';
import {
  GetAllEventsPublicHandler
} from '@/features/events/events/public/queries/get-all-events/get-all-events.public.handler';
import {
  GetOneEventsPublicHandler
} from '@/features/events/events/public/queries/get-one-events/get-one-events.public.handler';
import { ExpensesAdminController, ExpensesPublicController } from '@/features/finance/expenses/expenses.controller';
import {
  GetAllExpensesPublicHandler
} from '@/features/finance/expenses/public/queries/get-all-expenses/get-all-expenses.public.handler';
import {
  GetOneExpensesPublicHandler
} from '@/features/finance/expenses/public/queries/get-one-expenses/get-one-expenses.public.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Donation, Expense]),
    ConfigModule],

  controllers: [DonationsAdminController, DonationsPublicController,
    ExpensesAdminController, ExpensesPublicController],

  providers: [
    GetAllDonationsAdminHandler,
    GetOneDonationsAdminHandler,
    CreateDonationsAdminHandler,
    UpdateDonationsAdminHandler,
    DeleteDonationsAdminHandler,
    GetAllDonationsPublicHandler,
    GetOneDonationsPublicHandler,

    GetAllExpensesAdminHandler,
    GetOneExpensesAdminHandler,
    CreateExpensesAdminHandler,
    UpdateExpensesAdminHandler,
    DeleteExpensesAdminHandler,
    GetAllExpensesPublicHandler,
    GetOneExpensesPublicHandler,
  ],
})

export class FinanceModule {
}