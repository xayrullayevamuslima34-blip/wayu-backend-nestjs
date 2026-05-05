import { Command } from '@nestjs/cqrs';

export class DeleteDonationsAdminRequest extends Command<void> {
  id!: number;
}