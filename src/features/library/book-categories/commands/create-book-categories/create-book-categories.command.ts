import { Command } from '@nestjs/cqrs';
import { CreateBookCategoriesResponse } from './create-book-categories.response';

export class CreateBookCategoriesCommand extends Command<CreateBookCategoriesResponse>{
  constructor(
    public title: string,
  ) {
    super();
  }
}