import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateCountriesRequest {
  @ApiProperty({ required: false })
  @MaxLength(64)
  @IsString()
  @IsOptional()
  title!: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary', required: false })
  @IsOptional()
  flag!: string;

}