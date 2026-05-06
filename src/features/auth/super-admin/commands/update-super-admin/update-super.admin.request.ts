import { Command } from '@nestjs/cqrs';
import {
  UpdateAdminResponse,
} from '@/features/auth/super-admin/commands/update-super-admin/update-super.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsNumber, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateAdminRequest extends Command<UpdateAdminResponse> {
  @ApiProperty()
  @IsNumber()
  id!: number;

  @IsOptional()
  @IsString()
  @MaxLength(64)
  @ApiProperty({ required: false })
  fullName?: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @ApiProperty({ required: false })
  password?: string;

  @IsOptional()
  @IsDateString()
  @ApiProperty({ required: false })
  birthDate?: string;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({ required: false })
  isActive?: boolean;

}