import { Command } from '@nestjs/cqrs';

export class DeleteVacanciesAdminRequest extends Command<void> {
  id!: number;
}