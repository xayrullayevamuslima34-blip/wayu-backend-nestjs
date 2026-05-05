import { News } from '../../../news.entity';
import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteNewsAdminRequest } from './delete-news.admin.request';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@CommandHandler(DeleteNewsAdminRequest)
export class DeleteNewsAdminHandler implements ICommandHandler<DeleteNewsAdminRequest> {
  constructor(@InjectRepository(News) private readonly repo: Repository<News>) {}

  async execute(cmd: DeleteNewsAdminRequest): Promise<void> {

    const news = await this.repo.findOneBy({id: cmd.id})
    if (!news) throw new NotFoundException("News with ID ${cmd.id} not found");

    await this.repo.remove(news);
  }

}