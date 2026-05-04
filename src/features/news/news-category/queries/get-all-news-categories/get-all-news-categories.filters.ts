import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class GetAllNewsCategoriesFilters{
  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  page?: number;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  size?: number;
}