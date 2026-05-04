import { Command } from '@nestjs/cqrs';
import { CreateLanguagesResponse } from './create-languages.response';

export class CreateLanguagesCommand extends Command<CreateLanguagesResponse>{
  constructor(
    public title: string,
  ) {
    super();
  }
}