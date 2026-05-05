import { IsDateString, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateExpensesAdminRequest {
  @IsNumber()
  @ApiProperty()
  amount!: number;

  @ApiProperty()
  @IsDateString()
  date!: Date;

  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty({required: false})
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsNumber()
  @MaxLength(64)
  transactionId!: number;
}