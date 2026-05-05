import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import { UpdateEventCategoriesAdminResponse } from './update-event-categories.admin.response';

export class UpdateEventCategoriesAdminRequest extends Command<UpdateEventCategoriesAdminResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

}

