import { Command } from '@nestjs/cqrs';

export class DeleteInstagramPostsAdminRequest extends Command<void> {
  id!: number;
}