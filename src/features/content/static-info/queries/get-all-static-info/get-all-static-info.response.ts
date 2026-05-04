import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllStaticInfoResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  appStoreLink?: string;

  @Expose()
  @ApiProperty()
  playMarketLink?: string;

  @Expose()
  @ApiProperty()
  aboutUs!: string;

}