import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  UpdateSocialLinksAdminResponse
} from '@/features/content/social-links/admin/commands/update-social-links/update-social-links.admin.response';

export class UpdateSocialLinksAdminRequest extends Command<UpdateSocialLinksAdminResponse> {
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