import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteBookCategoriesAdminRequest } from './delete-book-categories.admin.request';
import { Repository } from 'typeorm';
import { BookCategory } from '../../../book-categories.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBookCategoriesAdminRequest)
export class DeleteBookCategoriesAdminHandler implements ICommandHandler<DeleteBookCategoriesAdminRequest> {
  constructor(@InjectRepository(BookCategory) private readonly repo: Repository<BookCategory>) {
  }

  async execute(cmd: DeleteBookCategoriesAdminRequest): Promise<void> {
    const newBookCategory = await this.repo.findOneBy({ id: cmd.id });
    if (!newBookCategory) throw new NotFoundException('Book category with given id not found');
    await BookCategory.remove(newBookCategory);
  }

}