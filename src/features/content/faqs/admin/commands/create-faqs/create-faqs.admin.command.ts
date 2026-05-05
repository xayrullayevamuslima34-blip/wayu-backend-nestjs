import { Command } from '@nestjs/cqrs';
import { CreateFaqsAdminResponse } from './create-faqs.admin.response';

export class CreateFaqsAdminCommand extends Command<CreateFaqsAdminResponse>{
  constructor(
    public question: string,
    public answer: string,
    public tagsId: number,
  ) {
    super();
  }
}