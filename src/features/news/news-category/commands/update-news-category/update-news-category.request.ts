import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateNewsCategoriesResponse } from './update-news-category.response';

export class UpdateNewsCategoriesCommand extends Command<UpdateNewsCategoriesResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;
}