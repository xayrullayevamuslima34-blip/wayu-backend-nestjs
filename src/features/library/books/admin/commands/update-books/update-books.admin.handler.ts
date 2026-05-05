import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateBooksAdminRequest } from './update-books.admin.request';
import { UpdateBooksAdminResponse } from './update-books.admin.response';
import { Book } from '../../../books.entity';

@CommandHandler(UpdateBooksAdminRequest)
export class UpdateBooksAdminHandler implements ICommandHandler<UpdateBooksAdminRequest> {
  async execute(cmd: UpdateBooksAdminRequest): Promise<UpdateBooksAdminResponse> {
    const book = await Book.findOne({ where: { id: cmd.id } });
    if (!book) throw new NotFoundException('Book not found');

    if (cmd.authorId !== undefined) book.authorId = cmd.authorId;
    if (cmd.categoryId !== undefined) book.categoryId = cmd.categoryId;
    if (cmd.title) book.title = cmd.title;
    if (cmd.description !== undefined) book.description = cmd.description;
    if (cmd.pages) book.pages = cmd.pages;
    if (cmd.year) book.year = cmd.year;

    if (cmd.image) {
      if (book.image && fs.existsSync(book.image)) {
        fs.rmSync(book.image);
      }
      book.image = (cmd.image as any).path;
    }

    if (cmd.file) {
      if (book.file && fs.existsSync(book.file)) {
        fs.rmSync(book.file);
      }
      book.file = (cmd.file as any).path;
    }

    await Book.save(book);
    return plainToInstance(UpdateBooksAdminResponse, book, { excludeExtraneousValues: true });
  }
}