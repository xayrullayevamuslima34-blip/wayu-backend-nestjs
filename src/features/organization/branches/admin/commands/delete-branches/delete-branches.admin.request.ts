import { Command } from '@nestjs/cqrs';

export class DeleteBranchesAdminRequest extends Command<void> {
  id!: number;
}