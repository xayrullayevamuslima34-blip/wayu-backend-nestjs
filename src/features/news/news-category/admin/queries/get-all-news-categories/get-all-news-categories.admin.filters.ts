import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { PaginatedFilters } from '@/core/filters/paginated.filters';

export class GetAllNewsCategoriesAdminFilters extends PaginatedFilters {
  @ApiProperty({required: false})
  @IsString()
  @MaxLength(64)
  @IsOptional()
  title!: string;

}