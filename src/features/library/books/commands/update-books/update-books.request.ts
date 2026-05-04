import { Command } from '@nestjs/cqrs';
import { UpdateBooksResponse } from './update-books.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBooksRequest extends Command<UpdateBooksResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  authorId?: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  categoryId?: number;

  @ApiProperty({required: false})
  @MaxLength(256)
  @IsOptional()
  @IsString()
  title?: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary', required: false})
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({required: false})
  @MaxLength(256)
  @IsString()
  @IsOptional()
  file?: Express.Multer.File;

  @ApiProperty({required: false})
  @IsNumber()
  @IsOptional()
  pages?: number;

  @ApiProperty({required: false})
  @IsNumber()
  @IsOptional()
  year?: number;

}