import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteVacanciesRequest } from './delete-vacancies.request';
import { Repository } from 'typeorm';
import { Vacancy } from '../../vacancies.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteVacanciesRequest)
export class DeleteVacanciesHandler implements ICommandHandler<DeleteVacanciesRequest> {
  constructor(@InjectRepository(Vacancy) private readonly repo: Repository<Vacancy>) {
  }

  async execute(cmd: DeleteVacanciesRequest): Promise<void> {
    const newVacancy = await this.repo.findOneBy({ id: cmd.id });
    if (!newVacancy) throw new NotFoundException('Vacancies with given id not found');
    await this.repo.remove(newVacancy);
  }

}