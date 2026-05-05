import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteVacanciesAdminRequest } from './delete-vacancies.admin.request';
import { Repository } from 'typeorm';
import { Vacancy } from '../../../vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteVacanciesAdminRequest)
export class DeleteVacanciesAdminHandler implements ICommandHandler<DeleteVacanciesAdminRequest> {
  constructor(@InjectRepository(Vacancy) private readonly repo: Repository<Vacancy>) {
  }

  async execute(cmd: DeleteVacanciesAdminRequest): Promise<void> {
    const newVacancy = await this.repo.findOneBy({ id: cmd.id });
    if (!newVacancy) throw new NotFoundException('Vacancies with given id not found');
    await this.repo.remove(newVacancy);
  }

}