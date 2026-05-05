import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateVacanciesAdminRequest } from './update-vacancies.admin.request';
import { UpdateVacanciesAdminResponse } from './update-vacancies.admin.response';
import { Vacancy } from '../../../vacancies.entity';

@CommandHandler(UpdateVacanciesAdminRequest)
export class UpdateVacanciesAdminHandler implements ICommandHandler<UpdateVacanciesAdminRequest> {
  async execute(cmd: UpdateVacanciesAdminRequest): Promise<UpdateVacanciesAdminResponse> {
    const vacancy = await Vacancy.findOne({ where: { id: cmd.id } });
    if (!vacancy) throw new NotFoundException('Vacancy not found');

    if (cmd.title) vacancy.title = cmd.title;
    if (cmd.address) vacancy.address = cmd.address;
    if (cmd.description) vacancy.description = cmd.description;
    if (cmd.phoneNumber) vacancy.phoneNumber = cmd.phoneNumber;
    if (cmd.type) vacancy.type = cmd.type;
    if (cmd.salary) vacancy.salary = cmd.salary;
    if (cmd.isActive !== undefined) vacancy.isActive = cmd.isActive;

    await Vacancy.save(vacancy);
    return plainToInstance(UpdateVacanciesAdminResponse, vacancy, { excludeExtraneousValues: true });
  }
}