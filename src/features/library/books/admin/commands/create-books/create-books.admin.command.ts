import { Command } from '@nestjs/cqrs';
import { CreateBooksAdminResponse } from './create-books.admin.response';

export class CreateBooksAdminCommand extends Command<CreateBooksAdminResponse> {
  constructor(
    public authorId: number,
    public categoryId: number,
    public title: string,
    public pages: number,
    public year: number,
    public description?: string,
    public image?: Express.Multer.File,
    public file?: Express.Multer.File,
  ) {
    super();
  }
}