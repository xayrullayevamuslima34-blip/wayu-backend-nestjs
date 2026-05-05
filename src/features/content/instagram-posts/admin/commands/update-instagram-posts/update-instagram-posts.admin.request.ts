import { Command } from '@nestjs/cqrs';
import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsOptional, IsString, MaxLength } from 'class-validator';
import {
  UpdateInstagramPostsAdminResponse
} from '@/features/content/instagram-posts/admin/commands/update-instagram-posts/update-instagram-posts.admin.response';

export class UpdateInstagramPostsAdminRequest extends Command<UpdateInstagramPostsAdminResponse>{
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