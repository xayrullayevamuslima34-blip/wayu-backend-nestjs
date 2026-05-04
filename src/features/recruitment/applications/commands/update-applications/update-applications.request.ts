import { Command } from '@nestjs/cqrs';
import { UpdateApplicationsResponse } from './update-applications.response';
import { ApplicationStatus } from '../../../../../core/enums/aplicationStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateApplicationsRequest extends Command<UpdateApplicationsResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(16)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  vacancyId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  resume?: string;

  @ApiProperty({ enum: ApplicationStatus, required: false })
  @IsEnum(ApplicationStatus)
  @IsOptional()
  status?: ApplicationStatus;
}