import { QuestionStatus } from '../../../../../../core/enums/questionStatus.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString, MaxLength } from 'class-validator';

export class CreateQuestionsAdminRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber!: string;

  @ApiProperty()
  @IsString()
  question!: string;

  @ApiProperty()
  @IsEnum(QuestionStatus)
  status!: QuestionStatus;
}