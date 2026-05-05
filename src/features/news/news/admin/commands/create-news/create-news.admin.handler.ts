import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsAdminCommand } from './create-news.admin.command';
import { CreateNewsAdminResponse } from './create-news.admin.response';
import { News } from '../../../news.entity';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../../../news-category/news-categories.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateNewsAdminCommand)
export class CreateNewsAdminHandler implements ICommandHandler<CreateNewsAdminCommand> {
  async execute(cmd: CreateNewsAdminCommand): Promise<CreateNewsAdminResponse> {
    const categoryExists = await NewsCategories.existsBy({id: cmd.categoryId})
    if (!categoryExists) {
      throw new NotFoundException("Category with given id not found");
    }

    const newNews = News.create({ categoryId: cmd.categoryId, title: cmd.title, image: cmd.image.path } as News);
    await News.save(newNews);
    return plainToInstance(CreateNewsAdminResponse, newNews, { excludeExtraneousValues: true });
  }

}