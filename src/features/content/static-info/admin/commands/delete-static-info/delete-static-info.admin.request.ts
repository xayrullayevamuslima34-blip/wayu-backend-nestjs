import { Command } from '@nestjs/cqrs';

export class DeleteStaticInfoAdminRequest extends Command<void> {
  id!: number;
}