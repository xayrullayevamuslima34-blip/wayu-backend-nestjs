import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateBookCategoriesAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

}