import { Command } from '@nestjs/cqrs';
import { UpdateCountriesResponse } from './update-countries.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCountriesRequest extends Command<UpdateCountriesResponse>{
  id!: number;

  @ApiProperty({required: false})
  @MaxLength(64)
  @IsString()
  @IsOptional()
  title?: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary', required: false})
  @IsOptional()
  flag?: Express.Multer.File;

}