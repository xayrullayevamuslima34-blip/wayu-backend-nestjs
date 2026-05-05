import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsString, MaxLength } from 'class-validator';

export class CreateUsefulLinksAdminRequest {
  @ApiProperty({required: false})
  @IsString()
  @MaxLength(128)
  title!: string;

  @ApiProperty({type: 'string', format: 'binary', required: false})
  @Allow()
  icon!: string;

  @ApiProperty({required: false})
  @IsString()
  @MaxLength(128)
  link!: string;
}