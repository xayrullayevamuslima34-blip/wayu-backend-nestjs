import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateBooksCommand } from './create-books.command';
import { CreateBooksResponse } from './create-books.response';
import { Book } from '../../books.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateBooksCommand)
export class CreateBooksHandler implements ICommandHandler<CreateBooksCommand> {
  async execute(cmd: CreateBooksCommand): Promise<CreateBooksResponse> {
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
    return plainToInstance(CreateBooksResponse, newBook, { excludeExtraneousValues: true });

  }

}