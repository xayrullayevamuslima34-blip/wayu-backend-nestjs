import { ILike } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateNewsCategoryRequest } from './create-news-category.request';
import { CreateNewsCategoryResponse } from './create-news-category.response';
import { NewsCategories } from '../../news-categories.entity';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(CreateNewsCategoryRequest)
export class CreateNewsCategoryHandler implements ICommandHandler<CreateNewsCategoryRequest> {

  async execute(command: CreateNewsCategoryRequest): Promise<CreateNewsCategoryResponse> {
    const alreadyExists = await NewsCategories.existsBy({title: ILike(command.title)})
    if (alreadyExists)
      throw new BadRequestException("Title is already taken")


    const newNewsCategory = NewsCategories.create({title: command.title} as NewsCategories)
    await NewsCategories.save(newNewsCategory);

    return plainToInstance(CreateNewsCategoryResponse, newNewsCategory, {excludeExtraneousValues: true});
  }
}












