import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVacanciesAdminCommand } from './create-vacancies.admin.command';
import { CreateVacanciesAdminResponse } from './create-vacancies.admin.response';
import { Vacancy } from '../../../vacancies.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateVacanciesAdminCommand)
export class CreateVacanciesAdminHandler implements ICommandHandler<CreateVacanciesAdminCommand> {
  async execute(cmd: CreateVacanciesAdminCommand): Promise<CreateVacanciesAdminResponse> {
    const newVacancy = Vacancy.create({
      title: cmd.title,
      address: cmd.address,
      description: cmd.description,
      phoneNumber: cmd.phoneNumber,
      type: cmd.type,
      salary: cmd.salary,
      isActive: cmd.isActive,
    });
    await Vacancy.save(newVacancy);
    return plainToInstance(CreateVacanciesAdminResponse, newVacancy, { excludeExtraneousValues: true });
  }

}