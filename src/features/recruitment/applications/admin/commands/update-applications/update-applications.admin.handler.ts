import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateApplicationsAdminRequest } from './update-applications.admin.request';
import { UpdateApplicationsAdminResponse } from './update-applications.admin.response';
import { Application } from '../../../applications.entity';

@CommandHandler(UpdateApplicationsAdminRequest)
export class UpdateApplicationsAdminHandler implements ICommandHandler<UpdateApplicationsAdminRequest> {
  async execute(cmd: UpdateApplicationsAdminRequest): Promise<UpdateApplicationsAdminResponse> {
    const application = await Application.findOne({ where: { id: cmd.id } });
    if (!application) throw new NotFoundException('Application not found');

    if (cmd.fullName) application.fullName = cmd.fullName;
    if (cmd.phoneNumber) application.phoneNumber = cmd.phoneNumber;
    if (cmd.email) application.email = cmd.email;
    if (cmd.vacancyId) application.vacancyId = cmd.vacancyId;
    if (cmd.resume) application.resume = cmd.resume;
    if (cmd.status) application.status = cmd.status;

    await Application.save(application);
    return plainToInstance(UpdateApplicationsAdminResponse, application, { excludeExtraneousValues: true });
  }
}