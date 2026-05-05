import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorsAdminCommand } from './create-authors.admin.command';
import { CreateAuthorsAdminResponse } from './create-authors.admin.response';
import { Author } from '../../../authors.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateAuthorsAdminCommand)
export class CreateAuthorsAdminHandler implements ICommandHandler<CreateAuthorsAdminCommand> {
  async execute(cmd: CreateAuthorsAdminCommand): Promise<CreateAuthorsAdminResponse> {
    const newAuthor = Author.create({
      fullName: cmd.fullName,
    });
    await Author.save(newAuthor);
    return plainToInstance(CreateAuthorsAdminResponse, newAuthor, { excludeExtraneousValues: true });
  }

}