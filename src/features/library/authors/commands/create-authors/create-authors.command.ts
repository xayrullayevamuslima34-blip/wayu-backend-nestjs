import { Command } from '@nestjs/cqrs';
import { CreateAuthorsResponse } from './create-authors.response';

export class CreateAuthorsCommand extends Command<CreateAuthorsResponse>{
  constructor(
    public fullName: string,
  ) {
    super();
  }
}