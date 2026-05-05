import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateEventCategoriesAdminRequest {
  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  title!: string;
}
