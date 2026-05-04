import { Command } from '@nestjs/cqrs';
import { UpdateStaticInfoResponse } from './update-static-info.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateStaticInfoRequest extends Command<UpdateStaticInfoResponse>{
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