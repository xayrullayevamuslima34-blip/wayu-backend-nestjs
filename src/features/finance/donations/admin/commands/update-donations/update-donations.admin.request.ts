import { Command } from '@nestjs/cqrs';
import { UpdateDonationsAdminResponse } from './update-donations.admin.response';
import { PaymentProvider } from '../../../../../../core/enums/paymentProvider.enum';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsNumber, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateDonationsAdminRequest extends Command<UpdateDonationsAdminResponse>{
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