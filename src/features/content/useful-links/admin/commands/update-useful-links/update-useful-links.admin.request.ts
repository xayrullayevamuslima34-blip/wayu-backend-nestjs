import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  UpdateUsefulLinksAdminResponse
} from '@/features/content/useful-links/admin/commands/update-useful-links/update-useful-links.admin.response';


export class UpdateUsefulLinksAdminRequest extends Command<UpdateUsefulLinksAdminResponse>{
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