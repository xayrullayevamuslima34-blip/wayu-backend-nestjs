import { Command } from '@nestjs/cqrs';
import { UpdateLanguagesAdminResponse } from './update-languages.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLanguagesAdminRequest extends Command<UpdateLanguagesAdminResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

}