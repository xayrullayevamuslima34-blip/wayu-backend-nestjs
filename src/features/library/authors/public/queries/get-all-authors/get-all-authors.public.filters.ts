import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllAuthorsPublicFilters {
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