import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateTagsAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;
}