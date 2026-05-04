import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteAuthorsRequest } from './delete-authors.request';
import { Repository } from 'typeorm';
import { Author } from '../../authors.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteAuthorsRequest)
export class DeleteAuthorsHandler implements ICommandHandler<DeleteAuthorsRequest> {
  constructor(@InjectRepository(Author) private readonly repo: Repository<Author>) {
  }

  async execute(cmd: DeleteAuthorsRequest): Promise<void> {
    const newAuthor = await this.repo.findOneBy({ id: cmd.id });
    if (!newAuthor) throw new NotFoundException('Author with given id not found');
    await Author.remove(newAuthor);
  }
}