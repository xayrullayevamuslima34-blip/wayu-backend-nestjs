import { Command } from '@nestjs/cqrs';

export class DeleteSocialLinksAdminRequest extends Command<void> {
  id!: number;
}