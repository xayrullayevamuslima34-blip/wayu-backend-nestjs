import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Language } from '../../../languages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteLanguagesAdminRequest } from './delete-languages.admin.request';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteLanguagesAdminRequest)
export class DeleteLanguagesAdminHandler implements ICommandHandler<DeleteLanguagesAdminRequest> {
  constructor(@InjectRepository(Language) private readonly repo: Repository<Language>) {
  }

  async execute(cmd: DeleteLanguagesAdminRequest): Promise<void> {
    const newLanguage = await this.repo.findOneBy({ id: cmd.id });
    if (!newLanguage) throw new NotFoundException('Language with given id not found');

    await this.repo.remove(newLanguage);
  }


}