import { Command } from '@nestjs/cqrs';

export class DeleteStaticInfoRequest extends Command<void> {
  id!: number;
}