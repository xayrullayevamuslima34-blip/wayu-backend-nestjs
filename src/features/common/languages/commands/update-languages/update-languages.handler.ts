import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateLanguagesRequest } from './update-languages.request';
import { UpdateLanguagesResponse } from './update-languages.response';
import { Language } from '../../languages.entity';

@CommandHandler(UpdateLanguagesRequest)
export class UpdateLanguagesHandler implements ICommandHandler<UpdateLanguagesRequest> {
  async execute(cmd: UpdateLanguagesRequest): Promise<UpdateLanguagesResponse> {
    const language = await Language.findOne({ where: { id: cmd.id } });
    if (!language) throw new NotFoundException('Language not found');

    if (cmd.title) language.title = cmd.title;

    await Language.save(language);
    return plainToInstance(UpdateLanguagesResponse, language, { excludeExtraneousValues: true });
  }
}