import { Command } from '@nestjs/cqrs';

export class DeleteBooksAdminRequest extends Command<void> {
  id!: number;
}