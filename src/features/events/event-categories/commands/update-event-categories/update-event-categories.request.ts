import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateEventCategoriesResponse } from './update-event-categories.response';

export class UpdateEventCategoriesRequest extends Command<UpdateEventCategoriesResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

}

