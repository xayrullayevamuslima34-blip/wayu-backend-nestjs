import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneStaticInfoPublicResponse{
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({required: false})
  appStoreLink?: string;

  @Expose()
  @ApiProperty({required: false})
  playMarketLink?: string;

  @Expose()
  @ApiProperty()
  aboutUs!: string;

}