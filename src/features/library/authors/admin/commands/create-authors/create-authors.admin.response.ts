import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthorsAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

}