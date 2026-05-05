import { Command } from '@nestjs/cqrs';
import { UpdateBookCategoriesAdminResponse } from './update-book-categories.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBookCategoriesAdminRequest extends Command<UpdateBookCategoriesAdminResponse>{
  id!: number;

  @ApiProperty({required: false})
  @MaxLength(64)
  @IsOptional()
  @IsString()
  title?: string;

}