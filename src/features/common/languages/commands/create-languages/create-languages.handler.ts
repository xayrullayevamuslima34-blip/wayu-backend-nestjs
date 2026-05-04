import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateLanguagesCommand } from './create-languages.command';
import { CreateLanguagesResponse } from './create-languages.response';
import { Language } from '../../languages.entity';
import { ConflictException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateLanguagesCommand)
export class CreateLanguagesHandler implements ICommandHandler<CreateLanguagesCommand> {
  async execute(cmd: CreateLanguagesCommand): Promise<CreateLanguagesResponse> {
    const langExists = await Language.existsBy({ title: cmd.title });
    if (langExists) throw new ConflictException(`Language with given title already exists`);

    const newLang = Language.create({
      title: cmd.title,
    } as Language);

    await Language.save(newLang);
    return plainToInstance(CreateLanguagesResponse, newLang, { excludeExtraneousValues: true });
  }

}