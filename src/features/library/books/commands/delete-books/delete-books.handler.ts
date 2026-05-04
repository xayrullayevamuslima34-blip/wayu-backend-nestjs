import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBooksRequest } from './delete-books.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../books.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBooksRequest)
export class DeleteBooksHandler implements ICommandHandler<DeleteBooksRequest> {
  constructor(@InjectRepository(Book) private readonly repo: Repository<Book>) {
  }

  async execute(cmd: DeleteBooksRequest): Promise<void> {
    const newBook = await this.repo.findOneBy({ id: cmd.id });
    if (!newBook) throw new NotFoundException('Book category with given id not found');
    await this.repo.remove(newBook);
  }
}