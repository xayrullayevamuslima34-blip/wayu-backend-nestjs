import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class AdminLoginResponse {
  @Expose()
  @ApiProperty()
  accessToken!: string;
}