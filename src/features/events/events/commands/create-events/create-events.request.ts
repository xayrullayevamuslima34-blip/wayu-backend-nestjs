import { Allow, IsDateString, IsInt, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateEventRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @IsString()
  @ApiProperty()
  content!: string;

  @Allow()
  @ApiProperty({ type: 'string', format: 'binary' })
  image!: Express.Multer.File;

  @ApiProperty()
  @IsDateString()
  date!: Date;

  @IsString()
  @MaxLength(128)
  @ApiProperty()
  address!: string;
}