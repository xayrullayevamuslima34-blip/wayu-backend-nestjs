import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { UpdateTagsAdminResponse } from './update-tags.admin.response';

export class UpdateTagsAdminRequest extends Command<UpdateTagsAdminResponse> {
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}