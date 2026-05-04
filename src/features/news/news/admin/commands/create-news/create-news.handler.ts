import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateNewsCommand } from './create-news.command';
import { CreateNewsResponse } from './create-news.response';
import { News } from '../../../news.entity';
import { plainToInstance } from 'class-transformer';
import { NewsCategories } from '../../../../news-category/news-categories.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(CreateNewsCommand)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommand> {
  async execute(cmd: CreateNewsCommand): Promise<CreateNewsResponse> {
    const categoryExists = await NewsCategories.existsBy({id: cmd.categoryId})
    if (!categoryExists) {
      throw new NotFoundException("Category with given id not found");
    }

    const newNews = News.create({ categoryId: cmd.categoryId, title: cmd.title, image: cmd.image.path } as News);
    await News.save(newNews);
    return plainToInstance(CreateNewsResponse, newNews, { excludeExtraneousValues: true });
  }

}