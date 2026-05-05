import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllExpensesAdminResponses {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  amount!: number;

  @Expose()
  @ApiProperty()
  date!: Date;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty({required: false})
  description?: string;

  @Expose()
  @ApiProperty()
  transactionId!: string;

}