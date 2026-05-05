import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBooksAdminCommand } from './create-books.admin.command';
import { CreateBooksAdminResponse } from './create-books.admin.response';
import { Book } from '../../../books.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBooksAdminCommand)
export class CreateBooksAdminHandler implements ICommandHandler<CreateBooksAdminCommand> {
  async execute(cmd: CreateBooksAdminCommand): Promise<CreateBooksAdminResponse> {
    const newBook = Book.create({
      authorId: cmd.authorId,
      categoryId: cmd.categoryId,
      title: cmd.title,
      image: cmd.image?.path,
      description: cmd.description,
      file: cmd.file?.path,
      pages: cmd.pages,
      year: cmd.year,
    });

    await Book.save(newBook);
    return plainToInstance(CreateBooksAdminResponse, newBook, { excludeExtraneousValues: true });

  }

}