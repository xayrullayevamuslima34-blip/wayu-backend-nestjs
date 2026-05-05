import { Command } from '@nestjs/cqrs';

export class DeleteAuthorsAdminRequest extends Command<void> {
  id!: number;
}