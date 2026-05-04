import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateNewsCategoriesCommand } from './update-news-category.request';
import { UpdateNewsCategoriesResponse } from './update-news-category.response';
import { NewsCategories } from '../../news-categories.entity';
@Injectable()
@CommandHandler(UpdateNewsCategoriesCommand)
export class UpdateNewsCategoriesHandler implements ICommandHandler<UpdateNewsCategoriesCommand> {
  async execute(cmd: UpdateNewsCategoriesCommand): Promise<UpdateNewsCategoriesResponse> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');

    await NewsCategories.save(category);
    return plainToInstance(UpdateNewsCategoriesResponse, category, { excludeExtraneousValues: true });
  }
}