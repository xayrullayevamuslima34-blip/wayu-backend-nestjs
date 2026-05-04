import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { CreateNewsCategoryResponse } from './create-news-category.response';

export class CreateNewsCategoryRequest extends Command<CreateNewsCategoryResponse>{
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;
}