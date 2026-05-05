import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { NewsCategories } from '../../../news-categories.entity';
import {
  DeleteNewsCategoryAdminRequest
} from '@/features/news/news-category/admin/commands/delete-news-category/delete-news-category.admin.request';

@Injectable()
@CommandHandler(DeleteNewsCategoryAdminRequest)
export class DeleteNewsCategoryAdminHandler implements ICommandHandler<DeleteNewsCategoryAdminRequest> {
  async execute(cmd: DeleteNewsCategoryAdminRequest): Promise<void> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');
    await NewsCategories.remove(category);
  }
}