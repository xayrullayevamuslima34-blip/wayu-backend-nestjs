import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCategoriesAdminCommand } from './create-book-categories.admin.command';
import { CreateBookCategoriesAdminResponse } from './create-book-categories.admin.response';
import { BookCategory } from '../../../book-categories.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBookCategoriesAdminCommand)
export class CreateBookCategoriesAdminHandler implements ICommandHandler<CreateBookCategoriesAdminCommand> {
  async execute(cmd: CreateBookCategoriesAdminCommand): Promise<CreateBookCategoriesAdminResponse> {
    const newBookCategory = BookCategory.create({
      title: cmd.title,
    });
    await BookCategory.save(newBookCategory);
    return plainToInstance(CreateBookCategoriesAdminResponse, newBookCategory, { excludeExtraneousValues: true });
  }

}