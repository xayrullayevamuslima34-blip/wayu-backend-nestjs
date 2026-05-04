import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class CreateStaticInfoResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({required: false})
  appStoreLink?: string;

  @Expose()
  @ApiProperty({required: false})
  @IsOptional()
  playMarketLink?: string;

  @Expose()
  @ApiProperty()
  aboutUs!: string;

}