import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '../../../../../../core/enums/aplicationStatus.enum';

export class UpdateApplicationsAdminResponse {
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
  email!: string;

  @Expose()
  @ApiProperty()
  vacancyId!: number;

  @Expose()
  @ApiProperty()
  resume!: string;

  @Expose()
  @ApiProperty({enum: ApplicationStatus})
  status!: ApplicationStatus;

}