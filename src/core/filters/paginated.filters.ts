import { IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PaginatedFilters {
  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  page?: number;

  @IsInt()
  @IsOptional()
  @ApiProperty({ required: false })
  size?: number;
}