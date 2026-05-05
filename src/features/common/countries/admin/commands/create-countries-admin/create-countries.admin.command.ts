import { Command } from '@nestjs/cqrs';
import { CreateCountriesAdminResponse } from './create-countries.admin.response';

export class CreateCountriesAdminCommand extends Command<CreateCountriesAdminResponse>{
  constructor(
    public title: string,
    public flag: Express.Multer.File,
  ) {
    super();
  }
}