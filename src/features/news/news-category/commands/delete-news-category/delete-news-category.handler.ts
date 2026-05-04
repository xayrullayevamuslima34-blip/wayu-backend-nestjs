import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsCategoriesCommand } from './delete-news-category.request';
import { NewsCategories } from '../../news-categories.entity';

@Injectable()
@CommandHandler(DeleteNewsCategoriesCommand)
export class DeleteNewsCategoriesHandler implements ICommandHandler<DeleteNewsCategoriesCommand> {
  async execute(cmd: DeleteNewsCategoriesCommand): Promise<void> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');
    await NewsCategories.remove(category);
  }
}