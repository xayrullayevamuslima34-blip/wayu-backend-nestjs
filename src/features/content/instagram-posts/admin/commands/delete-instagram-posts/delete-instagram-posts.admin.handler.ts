import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {
  DeleteInstagramPostsAdminRequest
} from '@/features/content/instagram-posts/admin/commands/delete-instagram-posts/delete-instagram-posts.admin.request';
import { InstagramPost } from '@/features/content/instagram-posts/instagram-posts.entity';

@CommandHandler(DeleteInstagramPostsAdminRequest)
export class DeleteInstagramPostsAdminHandler implements ICommandHandler<DeleteInstagramPostsAdminRequest> {
  constructor(@InjectRepository(InstagramPost) private readonly repo: Repository<InstagramPost>) {}

  async execute(cmd: DeleteInstagramPostsAdminRequest): Promise<void> {
        const newInstagramPost = await this.repo.findOneBy({id: cmd.id});
        if (!newInstagramPost) throw new NotFoundException(`Instagram post with id ${cmd.id} not found`);
        await this.repo.remove(newInstagramPost);
    }
}