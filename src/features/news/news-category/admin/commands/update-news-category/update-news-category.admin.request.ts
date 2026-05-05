import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateNewsCategoryAdminResponse } from './update-news-category.admin.response';

export class UpdateNewsCategoryAdminRequest extends Command<UpdateNewsCategoryAdminResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;
}