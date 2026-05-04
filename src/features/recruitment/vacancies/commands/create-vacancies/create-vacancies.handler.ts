import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateVacanciesCommand } from './create-vacancies.command';
import { CreateVacanciesResponse } from './create-vacancies.response';
import { Vacancy } from '../../vacancies.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateVacanciesCommand)
export class CreateVacanciesHandler implements ICommandHandler<CreateVacanciesCommand> {
  async execute(cmd: CreateVacanciesCommand): Promise<CreateVacanciesResponse> {
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
    return plainToInstance(CreateVacanciesResponse, newVacancy, { excludeExtraneousValues: true });
  }

}