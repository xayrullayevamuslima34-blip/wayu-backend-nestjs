import { Role } from '@/core/enums/role.enum';
import { ApiProperty } from '@nestjs/swagger';
import { LoginType } from '@/core/enums/loginType.enum';
import { IsBoolean, IsDateString, IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAdminRequest {
  @IsEnum(Role)
  @ApiProperty()
  role!: Role;

  @IsString()
  @ApiProperty()
  @MaxLength(64)
  fullName!: string;

  @IsString()
  @ApiProperty()
  @MaxLength(64)
  login!: string;

  @IsString()
  @MinLength(8)
  @MaxLength(128)
  @ApiProperty()
  password!: string;

  @IsEnum(LoginType)
  @ApiProperty()
  loginType!: LoginType;

  @IsDateString()
  @IsOptional()
  @ApiProperty({required: false})
  birthDate?: string;

  @IsBoolean()
  @ApiProperty()
  isActive!: boolean;
}