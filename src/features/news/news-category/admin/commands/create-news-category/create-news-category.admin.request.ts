import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Command } from '@nestjs/cqrs';
import { CreateNewsCategoryAdminResponse } from './create-news-category.admin.response';

export class CreateNewsCategoryAdminRequest extends Command<CreateNewsCategoryAdminResponse>{
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  title!: string;
}