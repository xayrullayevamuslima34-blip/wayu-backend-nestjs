import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateAuthorsAdminRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;
}