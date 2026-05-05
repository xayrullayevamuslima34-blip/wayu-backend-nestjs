import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLanguagesAdminCommand } from './create-languages.admin.command';
import { CreateLanguagesAdminResponse } from './create-languages.admin.response';
import { Language } from '../../../languages.entity';
import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateLanguagesAdminCommand)
export class CreateLanguagesAdminHandler implements ICommandHandler<CreateLanguagesAdminCommand> {
  async execute(cmd: CreateLanguagesAdminCommand): Promise<CreateLanguagesAdminResponse> {
    const langExists = await Language.existsBy({ title: cmd.title });
    if (langExists) throw new ConflictException(`Language with given title already exists`);

    const newLang = Language.create({
      title: cmd.title,
    } as Language);

    await Language.save(newLang);
    return plainToInstance(CreateLanguagesAdminResponse, newLang, { excludeExtraneousValues: true });
  }

}