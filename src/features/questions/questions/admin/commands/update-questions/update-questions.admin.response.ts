import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionStatus } from '../../../../../../core/enums/questionStatus.enum';

export class UpdateQuestionsAdminResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  question!: string;

  @Expose()
  @ApiProperty({enum: QuestionStatus})
  status!: QuestionStatus;

}