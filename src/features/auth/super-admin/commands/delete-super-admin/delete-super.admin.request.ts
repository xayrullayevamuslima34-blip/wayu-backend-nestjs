import { Command } from '@nestjs/cqrs';

export class DeleteAdminRequest extends Command<void>{
  id!: number;
}