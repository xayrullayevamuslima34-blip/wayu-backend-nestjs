import { Role } from '@/core/enums/role.enum';
import { LoginType } from '@/core/enums/loginType.enum';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminResponse {
  @Expose()
  @ApiProperty({enum: Role})
  role!: Role;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  login!: string;

  @Expose()
  @ApiProperty({enum: LoginType})
  loginType!: LoginType;

  @Expose()
  @ApiProperty({type: 'string', format: 'date', nullable: true})
  birthDate?: Date;

  @Expose()
  @ApiProperty()
  isActive!: boolean;
}