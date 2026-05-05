import { Command } from '@nestjs/cqrs';
import { UpdateNewsAdminResponse } from './update-news.admin.response';

export class UpdateNewsAdminCommand extends Command<UpdateNewsAdminResponse> {
  constructor(
    public id: number,
    public categoryId?: number,
    public countryId?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public date?: Date,
    public content?: string,
    public tagIds?: number[],
  ) {
    super();
  }
}