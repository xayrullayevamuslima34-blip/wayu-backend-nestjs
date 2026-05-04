import { Command } from '@nestjs/cqrs';
import { UpdateUsefulLinksResponse } from './update-useful-links.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateUsefulLinksRequest extends Command<UpdateUsefulLinksResponse>{
  id!: number;

  @ApiProperty()
  @MaxLength(128)
  @IsOptional()
  @IsString()
  title?: string;


  @Allow()
  @ApiProperty({type: 'string', format: 'binary', required: false})
  @IsOptional()
  icon?: Express.Multer.File;


  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @IsOptional()
  link?: string;

}