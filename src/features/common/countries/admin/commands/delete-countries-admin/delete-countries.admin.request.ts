import { Command } from '@nestjs/cqrs';

export class DeleteCountriesAdminRequest extends Command<void> {
  id!: number;
}