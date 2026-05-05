import { Command } from '@nestjs/cqrs';

export class DeleteTagsAdminRequest extends Command<void> {
  id!: number;
}