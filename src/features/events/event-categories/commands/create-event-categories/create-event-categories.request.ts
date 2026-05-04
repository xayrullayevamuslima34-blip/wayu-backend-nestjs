import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateEventCategoriesRequest {
  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  title!: string;
}
