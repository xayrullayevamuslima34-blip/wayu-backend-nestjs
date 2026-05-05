import { Command } from '@nestjs/cqrs';
import { CreateBookCategoriesAdminResponse } from './create-book-categories.admin.response';

export class CreateBookCategoriesAdminCommand extends Command<CreateBookCategoriesAdminResponse>{
  constructor(
    public title: string,
  ) {
    super();
  }
}