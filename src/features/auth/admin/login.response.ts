import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Role } from '@/core/enums/role.enum';

export class AdminLoginResponse {
  @Expose()
  @ApiProperty()
  accessToken!: string;

  @Expose()
  @ApiProperty({ enum: Role})
  role!: Role;

  @Expose()
  @ApiProperty()
  userId!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;
}