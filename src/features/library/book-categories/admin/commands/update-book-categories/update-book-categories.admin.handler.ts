import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateBookCategoriesAdminRequest } from './update-book-categories.admin.request';
import { UpdateBookCategoriesAdminResponse } from './update-book-categories.admin.response';
import { BookCategory } from '../../../book-categories.entity';

@CommandHandler(UpdateBookCategoriesAdminRequest)
export class UpdateBookCategoriesAdminHandler implements ICommandHandler<UpdateBookCategoriesAdminRequest> {
  async execute(cmd: UpdateBookCategoriesAdminRequest): Promise<UpdateBookCategoriesAdminResponse> {
    const bookCategory = await BookCategory.findOne({ where: { id: cmd.id } });
    if (!bookCategory) throw new NotFoundException('Book category not found');

    if (cmd.title) bookCategory.title = cmd.title;

    await BookCategory.save(bookCategory);
    return plainToInstance(UpdateBookCategoriesAdminResponse, bookCategory, { excludeExtraneousValues: true });
  }
}