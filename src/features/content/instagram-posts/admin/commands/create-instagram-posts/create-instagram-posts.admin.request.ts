import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateInstagramPostsAdminRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  image!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  link!: string;
}