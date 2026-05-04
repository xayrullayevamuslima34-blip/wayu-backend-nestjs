import { Command } from '@nestjs/cqrs';
import { CreateApplicationsResponse } from './create-applications.response';
import { ApplicationStatus } from '../../../../../core/enums/aplicationStatus.enum';

export class CreateApplicationsCommand extends Command<CreateApplicationsResponse>{
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