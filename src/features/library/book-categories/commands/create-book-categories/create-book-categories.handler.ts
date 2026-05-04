import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBookCategoriesCommand } from './create-book-categories.command';
import { CreateBookCategoriesResponse } from './create-book-categories.response';
import { BookCategory } from '../../book-categories.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBookCategoriesCommand)
export class CreateBookCategoriesHandler implements ICommandHandler<CreateBookCategoriesCommand> {
  async execute(cmd: CreateBookCategoriesCommand): Promise<CreateBookCategoriesResponse> {
    const newBookCategory = BookCategory.create({
      title: cmd.title,
    });
    await BookCategory.save(newBookCategory);
    return plainToInstance(CreateBookCategoriesResponse, newBookCategory, { excludeExtraneousValues: true });
  }

}