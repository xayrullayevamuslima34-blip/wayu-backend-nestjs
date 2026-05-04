import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateLanguagesRequest{
  @ApiProperty()
  @MaxLength(64)
  @IsString()
  title!: string;

}