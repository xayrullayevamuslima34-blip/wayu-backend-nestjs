import { Allow, IsArray, IsDateString, IsInt, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateNewsRequest {
  @IsInt()
  @Min(1)
  @ApiProperty()
  @Type(() => Number)
  categoryId!: number;

  @ApiProperty({ required: false })
  @IsInt()
  @IsOptional()
  countryId?: number;

  @IsString()
  @MaxLength(256)
  @ApiProperty()
  title!: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary' })
  image!: string;

  @ApiProperty()
  @IsDateString()
  date!: Date;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty({ type: [Number], required: false })
  @IsArray()
  @IsInt({ each: true })
  @IsOptional()
  tagIds?: number[];

}