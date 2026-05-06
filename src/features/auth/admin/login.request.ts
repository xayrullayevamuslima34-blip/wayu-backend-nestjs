import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength } from 'class-validator';

export class AdminLoginRequest {
  @IsString()
  @MaxLength(64)
  @ApiProperty()
  login!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @ApiProperty()
  password!: string;
}