import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateNewsCategoryAdminResponse } from './update-news-category.admin.response';
import { NewsCategories } from '../../../news-categories.entity';
import {
  UpdateNewsCategoryAdminRequest,
} from '@/features/news/news-category/admin/commands/update-news-category/update-news-category.admin.request';

@Injectable()
@CommandHandler(UpdateNewsCategoryAdminRequest)
export class UpdateNewsCategoryAdminHandler implements ICommandHandler<UpdateNewsCategoryAdminRequest> {
  async execute(cmd: UpdateNewsCategoryAdminRequest): Promise<UpdateNewsCategoryAdminResponse> {
    const category = await NewsCategories.findOneBy({ id: cmd.id });
    if (!category) throw new NotFoundException('News category not found');

    await NewsCategories.save(category);
    return plainToInstance(UpdateNewsCategoryAdminResponse, category, { excludeExtraneousValues: true });
  }
}