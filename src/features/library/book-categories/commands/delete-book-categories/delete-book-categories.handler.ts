import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCategoriesRequest } from './delete-book-categories.request';
import { Repository } from 'typeorm';
import { BookCategory } from '../../book-categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBookCategoriesRequest)
export class DeleteBookCategoriesHandler implements ICommandHandler<DeleteBookCategoriesRequest> {
  constructor(@InjectRepository(BookCategory) private readonly repo: Repository<BookCategory>) {
  }

  async execute(cmd: DeleteBookCategoriesRequest): Promise<void> {
    const newBookCategory = await this.repo.findOneBy({ id: cmd.id });
    if (!newBookCategory) throw new NotFoundException('Book category with given id not found');
    await BookCategory.remove(newBookCategory);
  }

}