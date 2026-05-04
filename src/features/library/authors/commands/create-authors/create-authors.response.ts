import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

}