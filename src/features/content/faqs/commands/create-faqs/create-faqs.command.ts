import { Command } from '@nestjs/cqrs';
import { CreateFaqsResponse } from './create-faqs.response';

export class CreateFaqsCommand extends Command<CreateFaqsResponse>{
  constructor(
    public question: string,
    public answer: string,
    public tagsId: number,
  ) {
    super();
  }
}