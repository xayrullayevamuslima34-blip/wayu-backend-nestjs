import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';
import { CreateTagsAdminResponse } from './create-tags.admin.response';

export class CreateTagsAdminRequest extends Command<CreateTagsAdminResponse> {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  title!: string;
}