import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsDateString, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  UpdateEventsAdminResponse
} from 'src/features/events/events/admin/commands/update-events/update-events.admin.response';

export class UpdateEventsAdminRequest extends Command<UpdateEventsAdminResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  categoryId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(256)
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsDateString()
  @IsOptional()
  date?: Date;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  @MaxLength(128)
  address?: string;
}