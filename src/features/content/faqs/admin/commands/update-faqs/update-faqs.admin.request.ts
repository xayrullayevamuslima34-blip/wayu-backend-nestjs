import { Command } from '@nestjs/cqrs';
import { UpdateFaqsAdminResponse } from './update-faqs.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFaqsAdminRequest extends Command<UpdateFaqsAdminResponse>{
  id!: number;

  @ApiProperty({required: false})
  @MaxLength(256)
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty({required: false})
  @IsString()
  @MaxLength(512)
  @IsOptional()
  answer?: string;

  @ApiProperty({required: false})
  @IsNumber()
  @IsOptional()
  tagsId?: number;

}