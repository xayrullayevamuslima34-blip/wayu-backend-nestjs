import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';

export class CreateRepresentativesRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary'})
  image!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  email!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  resume!: string;
}