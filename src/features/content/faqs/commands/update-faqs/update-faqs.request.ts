import { Command } from '@nestjs/cqrs';
import { UpdateFaqsResponse } from './update-faqs.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateFaqsRequest extends Command<UpdateFaqsResponse>{
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