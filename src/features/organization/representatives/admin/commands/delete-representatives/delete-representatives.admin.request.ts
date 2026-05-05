import { Command } from '@nestjs/cqrs';

export class DeleteRepresentativesAdminRequest extends Command<void> {
  id!: number;
}