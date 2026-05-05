import { Command } from '@nestjs/cqrs';
import { UpdateRepresentativesAdminResponse } from './update-representatives.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRepresentativesAdminRequest extends Command<UpdateRepresentativesAdminResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  fullName?: string;

  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @Allow()
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(16)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  resume?: string;
}