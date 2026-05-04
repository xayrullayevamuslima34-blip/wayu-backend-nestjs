import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateApplicationsRequest } from './update-applications.request';
import { UpdateApplicationsResponse } from './update-applications.response';
import { Application } from '../../applications.entity';

@CommandHandler(UpdateApplicationsRequest)
export class UpdateApplicationsHandler implements ICommandHandler<UpdateApplicationsRequest> {
  async execute(cmd: UpdateApplicationsRequest): Promise<UpdateApplicationsResponse> {
    const application = await Application.findOne({ where: { id: cmd.id } });
    if (!application) throw new NotFoundException('Application not found');

    if (cmd.fullName) application.fullName = cmd.fullName;
    if (cmd.phoneNumber) application.phoneNumber = cmd.phoneNumber;
    if (cmd.email) application.email = cmd.email;
    if (cmd.vacancyId) application.vacancyId = cmd.vacancyId;
    if (cmd.resume) application.resume = cmd.resume;
    if (cmd.status) application.status = cmd.status;

    await Application.save(application);
    return plainToInstance(UpdateApplicationsResponse, application, { excludeExtraneousValues: true });
  }
}