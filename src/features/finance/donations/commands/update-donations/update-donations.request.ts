import { Command } from '@nestjs/cqrs';
import { UpdateDonationsResponse } from './update-donations.response';
import { PaymentProvider } from '../../../../../core/enums/paymentProvider.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDonationsRequest extends Command<UpdateDonationsResponse>{
  id!: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({required: false})
  @MaxLength(64)
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({required: false})
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ enum: PaymentProvider, required: false})
  @IsEnum(PaymentProvider)
  @IsOptional()
  paidBy?: PaymentProvider;

}