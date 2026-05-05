import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CreateNewsAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;
}