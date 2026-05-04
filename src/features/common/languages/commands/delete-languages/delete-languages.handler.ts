import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { Language } from '../../languages.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteLanguagesRequest } from './delete-languages.request';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteLanguagesRequest)
export class DeleteLanguagesHandler implements ICommandHandler<DeleteLanguagesRequest> {
  constructor(@InjectRepository(Language) private readonly repo: Repository<Language>) {
  }

  async execute(cmd: DeleteLanguagesRequest): Promise<void> {
    const newLanguage = await this.repo.findOneBy({ id: cmd.id });
    if (!newLanguage) throw new NotFoundException('Language with given id not found');

    await this.repo.remove(newLanguage);
  }


}