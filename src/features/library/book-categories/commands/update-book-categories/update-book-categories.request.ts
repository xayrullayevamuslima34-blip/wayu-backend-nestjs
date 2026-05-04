import { Command } from '@nestjs/cqrs';
import { UpdateBookCategoriesResponse } from './update-book-categories.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBookCategoriesRequest extends Command<UpdateBookCategoriesResponse>{
  id!: number;

  @ApiProperty({required: false})
  @MaxLength(64)
  @IsOptional()
  @IsString()
  title?: string;

}