import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PaymentProvider } from '../../../../../core/enums/paymentProvider.enum';

export class GetAllDonationsResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  amount!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  date!: Date;

  @Expose()
  @ApiProperty()
  paidBy!: PaymentProvider;

}