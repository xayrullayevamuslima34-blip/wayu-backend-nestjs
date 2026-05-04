import { Command } from '@nestjs/cqrs';
import { UpdateLanguagesResponse } from './update-languages.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateLanguagesRequest extends Command<UpdateLanguagesResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title?: string;

}