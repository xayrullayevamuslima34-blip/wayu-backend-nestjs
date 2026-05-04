import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateAuthorsRequest } from './update-authors.request';
import { UpdateAuthorsResponse } from './update-authors.response';
import { Author } from '../../authors.entity';

@CommandHandler(UpdateAuthorsRequest)
export class UpdateAuthorsHandler implements ICommandHandler<UpdateAuthorsRequest> {
  async execute(cmd: UpdateAuthorsRequest): Promise<UpdateAuthorsResponse> {
    const author = await Author.findOne({ where: { id: cmd.id } });
    if (!author) throw new NotFoundException('Author not found');

    if (cmd.fullName) author.fullName = cmd.fullName;

    await Author.save(author);
    return plainToInstance(UpdateAuthorsResponse, author, { excludeExtraneousValues: true });
  }
}