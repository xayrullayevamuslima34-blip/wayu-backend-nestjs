import { PaymentProvider } from '../../../../../../core/enums/paymentProvider.enum';
import { IsDateString, IsEnum, IsNumber, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDonationsAdminRequest {
  @IsNumber()
  @ApiProperty()
  amount!: number;

  @ApiProperty()
  @IsString()
  @MaxLength(64)
  fullName!: string;

  @IsDateString()
  @ApiProperty()
  date!: Date;

  @ApiProperty()
  @IsEnum(PaymentProvider)
  paidBy!: PaymentProvider;
}