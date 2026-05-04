import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstagramPostsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  link!: string;

}