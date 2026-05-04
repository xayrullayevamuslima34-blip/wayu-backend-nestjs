import { Column } from 'typeorm';
import { VacancyType } from '../../../../../core/enums/vacancyType.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateVacanciesRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  address!: string;

  @ApiProperty()
  @IsString()
  description!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsEnum(VacancyType)
  type!: VacancyType;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  salary!: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isActive!: boolean;
}