import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export class CreateFaqsAdminRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  question!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(512)
  answer!: string;

  @ApiProperty()
  @IsNumber()
  tagsId!: number;
}