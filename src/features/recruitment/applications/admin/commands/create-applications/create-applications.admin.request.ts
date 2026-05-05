import { ApplicationStatus } from '../../../../../../core/enums/aplicationStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateApplicationsAdminRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  email!: string;

  @ApiProperty()
  @IsNumber()
  vacancyId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  resume!: string;

  @ApiProperty()
  @IsEnum(ApplicationStatus)
  status!: ApplicationStatus;
}