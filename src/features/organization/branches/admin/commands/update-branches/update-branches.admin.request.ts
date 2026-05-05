import { Command } from '@nestjs/cqrs';
import { UpdateBranchesAdminResponse } from './update-branches.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateBranchesAdminRequest extends Command<UpdateBranchesAdminResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  countryId?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  representativeId?: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  city?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  latitude?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  longitude?: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(16)
  @IsOptional()
  phoneNumber?: string;
}