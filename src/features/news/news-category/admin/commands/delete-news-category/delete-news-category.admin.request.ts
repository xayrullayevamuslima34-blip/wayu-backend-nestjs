import { Command } from '@nestjs/cqrs';

export class DeleteNewsCategoryAdminRequest extends Command<void> {
  id!: number;
}