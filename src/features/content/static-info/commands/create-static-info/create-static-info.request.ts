import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateStaticInfoRequest {
  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  @MaxLength(128)
  appStoreLink?: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  @MaxLength(128)
  playMarketLink?: string;

  @ApiProperty()
  @IsString()
  aboutUs!: string;
}