import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateLanguagesAdminRequest } from './update-languages.admin.request';
import { UpdateLanguagesAdminResponse } from './update-languages.admin.response';
import { Language } from '../../../languages.entity';

@CommandHandler(UpdateLanguagesAdminRequest)
export class UpdateLanguagesAdminHandler implements ICommandHandler<UpdateLanguagesAdminRequest> {
  async execute(cmd: UpdateLanguagesAdminRequest): Promise<UpdateLanguagesAdminResponse> {
    const language = await Language.findOne({ where: { id: cmd.id } });
    if (!language) throw new NotFoundException('Language not found');

    if (cmd.title) language.title = cmd.title;

    await Language.save(language);
    return plainToInstance(UpdateLanguagesAdminResponse, language, { excludeExtraneousValues: true });
  }
}