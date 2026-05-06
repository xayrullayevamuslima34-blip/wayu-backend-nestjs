import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';

export class GetOneAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty({ enum: Role})
  role!: Role;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  login!: string;

  @Expose()
  @ApiProperty({ enum: LoginType})
  loginType!: LoginType;

  @Expose()
  @ApiProperty({ type: 'string', format: 'date', nullable: true})
  birthDate?: string;

  @Expose()
  @ApiProperty()
  isActive!: boolean;

  @Expose()
  @ApiProperty()
  createdAt?: string;

  @Expose()
  @ApiProperty()
  updatedAt?: string;
}