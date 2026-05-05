import { Command } from '@nestjs/cqrs';
import { UpdateExpensesAdminResponse } from './update-expenses.admin.response';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateExpensesAdminRequest extends Command<UpdateExpensesAdminResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsNumber()
  @IsOptional()
  amount?: number;

  @ApiProperty({required: false})
  @IsDateString()
  @IsOptional()
  date?: Date;

  @IsString()
  @ApiProperty({required: false})
  @MaxLength(256)
  @IsOptional()
  title?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({required: false})
  @MaxLength(64)

  @IsOptional()
  @ApiProperty({required: false})
  @IsNumber()
  transactionId?: number;

}