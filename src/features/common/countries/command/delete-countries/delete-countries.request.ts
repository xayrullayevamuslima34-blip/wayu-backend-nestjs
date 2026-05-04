import { Command } from '@nestjs/cqrs';

export class DeleteCountriesRequest extends Command<void> {
  id!: number;
}