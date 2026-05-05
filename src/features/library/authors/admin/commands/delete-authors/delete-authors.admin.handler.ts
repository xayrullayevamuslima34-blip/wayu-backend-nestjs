import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorsAdminRequest } from './delete-authors.admin.request';
import { Repository } from 'typeorm';
import { Author } from '../../../authors.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteAuthorsAdminRequest)
export class DeleteAuthorsAdminHandler implements ICommandHandler<DeleteAuthorsAdminRequest> {
  constructor(@InjectRepository(Author) private readonly repo: Repository<Author>) {
  }

  async execute(cmd: DeleteAuthorsAdminRequest): Promise<void> {
    const newAuthor = await this.repo.findOneBy({ id: cmd.id });
    if (!newAuthor) throw new NotFoundException('Author with given id not found');
    await Author.remove(newAuthor);
  }
}