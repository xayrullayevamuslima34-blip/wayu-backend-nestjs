import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateBookCategoriesRequest } from './update-book-categories.request';
import { UpdateBookCategoriesResponse } from './update-book-categories.response';
import { BookCategory } from '../../book-categories.entity';

@CommandHandler(UpdateBookCategoriesRequest)
export class UpdateBookCategoriesHandler implements ICommandHandler<UpdateBookCategoriesRequest> {
  async execute(cmd: UpdateBookCategoriesRequest): Promise<UpdateBookCategoriesResponse> {
    const bookCategory = await BookCategory.findOne({ where: { id: cmd.id } });
    if (!bookCategory) throw new NotFoundException('Book category not found');

    if (cmd.title) bookCategory.title = cmd.title;

    await BookCategory.save(bookCategory);
    return plainToInstance(UpdateBookCategoriesResponse, bookCategory, { excludeExtraneousValues: true });
  }
}