import { Command } from '@nestjs/cqrs';
import { UpdateQuestionsAdminResponse } from './update-questions.admin.response';
import { QuestionStatus } from '../../../../../../core/enums/questionStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateQuestionsAdminRequest extends Command<UpdateQuestionsAdminResponse> {
  id!: number;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(64)
  @IsOptional()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @MaxLength(16)
  @IsOptional()
  phoneNumber?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  question?: string;

  @ApiProperty({ enum: QuestionStatus, required: false })
  @IsEnum(QuestionStatus)
  @IsOptional()
  status?: QuestionStatus;
}