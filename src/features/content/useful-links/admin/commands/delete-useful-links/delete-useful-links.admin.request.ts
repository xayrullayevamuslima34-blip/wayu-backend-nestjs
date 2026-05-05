import { Command } from '@nestjs/cqrs';

export class DeleteUsefulLinksAdminRequest extends Command<void> {
  id!: number;
}