import { Command } from '@nestjs/cqrs';
import { UpdateAuthorsResponse } from './update-authors.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorsRequest extends Command<UpdateAuthorsResponse>{
  id!: number;

  @ApiProperty({required: false})
  @MaxLength(64)
  @IsString()
  @IsOptional()
  fullName?: string;

}