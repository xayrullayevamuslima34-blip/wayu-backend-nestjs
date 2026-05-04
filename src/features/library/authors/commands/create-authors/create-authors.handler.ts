import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateAuthorsCommand } from './create-authors.command';
import { CreateAuthorsResponse } from './create-authors.response';
import { Author } from '../../authors.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateAuthorsCommand)
export class CreateAuthorsHandler implements ICommandHandler<CreateAuthorsCommand> {
  async execute(cmd: CreateAuthorsCommand): Promise<CreateAuthorsResponse> {
    const newAuthor = Author.create({
      fullName: cmd.fullName,
    });
    await Author.save(newAuthor);
    return plainToInstance(CreateAuthorsResponse, newAuthor, { excludeExtraneousValues: true });
  }

}