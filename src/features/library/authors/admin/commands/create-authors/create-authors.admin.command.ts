import { Command } from '@nestjs/cqrs';
import { CreateAuthorsAdminResponse } from './create-authors.admin.response';

export class CreateAuthorsAdminCommand extends Command<CreateAuthorsAdminResponse>{
  constructor(
    public fullName: string,
  ) {
    super();
  }
}