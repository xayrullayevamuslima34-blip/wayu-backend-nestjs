import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateApplicationsAdminCommand } from './create-applications.admin.command';
import { CreateApplicationsAdminResponse } from './create-applications.admin.response';
import { Application } from '../../../applications.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateApplicationsAdminCommand)
export class CreateApplicationsAdminHandler implements ICommandHandler<CreateApplicationsAdminCommand> {
  async execute(cmd: CreateApplicationsAdminCommand): Promise<CreateApplicationsAdminResponse> {
    const newApplication = Application.create({
      fullName: cmd.fullName,
      phoneNumber: cmd.phoneNumber,
      email: cmd.email,
      vacancyId: cmd.vacancyId,
      resume: cmd.resume,
      status: cmd.status,
    });
    await Application.save(newApplication);
    return plainToInstance(CreateApplicationsAdminResponse, newApplication, { excludeExtraneousValues: true });
  }

}