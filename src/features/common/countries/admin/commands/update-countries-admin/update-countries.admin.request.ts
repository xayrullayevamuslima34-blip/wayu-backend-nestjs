import { Command } from '@nestjs/cqrs';
import { UpdateCountriesAdminResponse } from './update-countries.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateCountriesAdminRequest extends Command<UpdateCountriesAdminResponse>{
  @ApiProperty()
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