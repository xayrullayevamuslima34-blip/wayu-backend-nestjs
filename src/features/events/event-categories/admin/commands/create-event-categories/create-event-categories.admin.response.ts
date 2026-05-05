import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventCategoriesAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

}
