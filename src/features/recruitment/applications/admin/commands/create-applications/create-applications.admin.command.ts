import { Command } from '@nestjs/cqrs';
import { CreateApplicationsAdminResponse } from './create-applications.admin.response';
import { ApplicationStatus } from '../../../../../../core/enums/aplicationStatus.enum';

export class CreateApplicationsAdminCommand extends Command<CreateApplicationsAdminResponse>{
  constructor(
    public fullName: string,
    public phoneNumber: string,
    public email: string,
    public vacancyId: number,
    public resume: string,
    public status: ApplicationStatus,
  ) {
    super();
  }
}