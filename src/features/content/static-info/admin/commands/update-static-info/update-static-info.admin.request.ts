import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';
import {
  UpdateStaticInfoAdminResponse
} from '@/features/content/static-info/admin/commands/update-static-info/update-static-info.admin.response';

export class UpdateStaticInfoAdminRequest extends Command<UpdateStaticInfoAdminResponse>{
  id!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @IsOptional()
  appStoreLink?: string;

  @ApiProperty()
  @IsString()
  @MaxLength(128)
  @IsOptional()
  playMarketLink?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  aboutUs!: string;

}