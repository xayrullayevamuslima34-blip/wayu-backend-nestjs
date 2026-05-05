import { Command } from '@nestjs/cqrs';
import { UpdateVacanciesAdminResponse } from './update-vacancies.admin.response';
import { VacancyType } from '../../../../../../core/enums/vacancyType.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateVacanciesAdminRequest extends Command<UpdateVacanciesAdminResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(256)
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  address?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(16)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ enum: VacancyType, required: false })
  @IsEnum(VacancyType)
  @IsOptional()
  type?: VacancyType;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  salary?: string;

  @ApiProperty({ required: false })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}