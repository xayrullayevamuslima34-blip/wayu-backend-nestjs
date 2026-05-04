import { Command } from '@nestjs/cqrs';
import { UpdateInstagramPostsResponse } from './update-instagram-posts.response';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateInstagramPostsRequest extends Command<UpdateInstagramPostsResponse>{
  id!: number;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary', required: false})
  @IsOptional()
  image?: Express.Multer.File;

  @ApiProperty()
  @MaxLength(128)
  @IsString()
  @IsOptional()
  link?: string;

}