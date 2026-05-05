import { Command } from '@nestjs/cqrs';

export class DeleteApplicationsAdminRequest extends Command<void> {
  id!: number;
}