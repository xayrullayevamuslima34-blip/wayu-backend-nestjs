import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateAuthorsAdminRequest } from './update-authors.admin.request';
import { UpdateAuthorsAdminResponse } from './update-authors.admin.response';
import { Author } from '../../../authors.entity';

@CommandHandler(UpdateAuthorsAdminRequest)
export class UpdateAuthorsAdminHandler implements ICommandHandler<UpdateAuthorsAdminRequest> {
  async execute(cmd: UpdateAuthorsAdminRequest): Promise<UpdateAuthorsAdminResponse> {
    const author = await Author.findOne({ where: { id: cmd.id } });
    if (!author) throw new NotFoundException('Author not found');

    if (cmd.fullName) author.fullName = cmd.fullName;

    await Author.save(author);
    return plainToInstance(UpdateAuthorsAdminResponse, author, { excludeExtraneousValues: true });
  }
}