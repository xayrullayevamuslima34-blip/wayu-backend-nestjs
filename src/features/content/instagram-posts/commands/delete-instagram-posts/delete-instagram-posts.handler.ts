import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteInstagramPostsRequest } from './delete-instagram-posts.request';
import { Repository } from 'typeorm';
import { InstagramPost } from '../../instagram-posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteInstagramPostsRequest)
export class DeleteInstagramPostsHandler implements ICommandHandler<DeleteInstagramPostsRequest> {
  constructor(@InjectRepository(InstagramPost) private readonly repo: Repository<InstagramPost>) {}

  async execute(cmd: DeleteInstagramPostsRequest): Promise<void> {
        const newInstagramPost = await this.repo.findOneBy({id: cmd.id});
        if (!newInstagramPost) throw new NotFoundException(`Instagram post with id ${cmd.id} not found`);
        await this.repo.remove(newInstagramPost);
    }
}