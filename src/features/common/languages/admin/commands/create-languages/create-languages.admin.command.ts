import { Command } from '@nestjs/cqrs';
import { CreateLanguagesAdminResponse } from './create-languages.admin.response';

export class CreateLanguagesAdminCommand extends Command<CreateLanguagesAdminResponse>{
  constructor(
    public title: string,
  ) {
    super();
  }
}