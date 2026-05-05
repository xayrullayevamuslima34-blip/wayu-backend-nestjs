import { ApiProperty } from '@nestjs/swagger';
import { Allow, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateBooksAdminRequest {
  @ApiProperty()
  @IsNumber()
  authorId!: number;

  @ApiProperty()
  @IsNumber()
  categoryId!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary'})
  image!: Express.Multer.File;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  description?: string;

  @Allow()
  @ApiProperty({type: 'string', format: 'binary'})
  file!: string;

  @ApiProperty()
  @IsNumber()
  pages!: number;

  @ApiProperty()
  @IsNumber()
  year!: number;
}