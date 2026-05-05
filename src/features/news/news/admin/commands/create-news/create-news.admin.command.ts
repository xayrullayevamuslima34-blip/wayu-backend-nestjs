import { Command } from '@nestjs/cqrs';
import { CreateNewsAdminResponse } from './create-news.admin.response';

export class CreateNewsAdminCommand extends Command<CreateNewsAdminResponse> {
  constructor(
    public categoryId: number,
    public title: string,
    public image: Express.Multer.File,
    public date: Date,
    public content: string,
    public countryId?: number,
    public tagIds?: number[],
  ) {
    super();
  }
}