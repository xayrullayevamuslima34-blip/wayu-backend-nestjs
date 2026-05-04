import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateApplicationsCommand } from './create-applications.command';
import { CreateApplicationsResponse } from './create-applications.response';
import { Application } from '../../applications.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateApplicationsCommand)
export class CreateApplicationsHandler implements ICommandHandler<CreateApplicationsCommand> {
  async execute(cmd: CreateApplicationsCommand): Promise<CreateApplicationsResponse> {
    const newApplication = Application.create({
      fullName: cmd.fullName,
      phoneNumber: cmd.phoneNumber,
      email: cmd.email,
      vacancyId: cmd.vacancyId,
      resume: cmd.resume,
      status: cmd.status,
    });
    await Application.save(newApplication);
    return plainToInstance(CreateApplicationsResponse, newApplication, { excludeExtraneousValues: true });
  }

}