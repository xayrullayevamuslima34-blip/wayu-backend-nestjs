import { Command } from '@nestjs/cqrs';

export class DeleteLanguagesAdminRequest extends Command<void> {
  id!: number;
}