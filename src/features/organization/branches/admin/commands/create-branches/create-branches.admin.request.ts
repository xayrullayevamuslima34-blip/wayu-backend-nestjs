import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateBranchesAdminRequest {
  @ApiProperty()
  @IsNumber()
  countryId!: number;

  @ApiProperty()
  @IsNumber()
  representativeId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  city!: string;

  @ApiProperty()
  @IsNumber()
  latitude!: number;

  @ApiProperty()
  @IsNumber()
  longitude!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;
}