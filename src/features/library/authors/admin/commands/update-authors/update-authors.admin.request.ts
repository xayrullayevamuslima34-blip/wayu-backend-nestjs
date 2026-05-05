import { Command } from '@nestjs/cqrs';
import { UpdateAuthorsAdminResponse } from './update-authors.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateAuthorsAdminRequest extends Command<UpdateAuthorsAdminResponse>{
  id!: number;

  @ApiProperty({required: false})
  @MaxLength(64)
  @IsString()
  @IsOptional()
  fullName?: string;

}