import { ILike } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateNewsCategoryAdminRequest } from './create-news-category.admin.request';
import { CreateNewsCategoryAdminResponse } from './create-news-category.admin.response';
import { NewsCategories } from '../../../news-categories.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateNewsCategoryAdminRequest)
export class CreateNewsCategoryAdminHandler implements ICommandHandler<CreateNewsCategoryAdminRequest> {

  async execute(command: CreateNewsCategoryAdminRequest): Promise<CreateNewsCategoryAdminResponse> {
    const alreadyExists = await NewsCategories.existsBy({title: ILike(command.title)})
    if (alreadyExists)
      throw new BadRequestException("Title is already taken")


    const newNewsCategory = NewsCategories.create({title: command.title} as NewsCategories)
    await NewsCategories.save(newNewsCategory);

    return plainToInstance(CreateNewsCategoryAdminResponse, newNewsCategory, {excludeExtraneousValues: true});
  }
}












