import { Command } from '@nestjs/cqrs';
import { UpdateSocialLinksResponse } from './update-social-links.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateSocialLinksRequest extends Command<UpdateSocialLinksResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @MaxLength(64)
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  icon?: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  link?: string;
}