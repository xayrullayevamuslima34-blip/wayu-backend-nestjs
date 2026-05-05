import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBooksAdminRequest } from './delete-books.admin.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../../../books.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBooksAdminRequest)
export class DeleteBooksAdminHandler implements ICommandHandler<DeleteBooksAdminRequest> {
  constructor(@InjectRepository(Book) private readonly repo: Repository<Book>) {
  }

  async execute(cmd: DeleteBooksAdminRequest): Promise<void> {
    const newBook = await this.repo.findOneBy({ id: cmd.id });
    if (!newBook) throw new NotFoundException('Book category with given id not found');
    await this.repo.remove(newBook);
  }
}