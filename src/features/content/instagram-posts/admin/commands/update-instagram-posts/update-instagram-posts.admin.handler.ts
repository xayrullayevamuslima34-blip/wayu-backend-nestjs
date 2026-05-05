import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import {
  UpdateInstagramPostsAdminRequest
} from '@/features/content/instagram-posts/admin/commands/update-instagram-posts/update-instagram-posts.admin.request';
import {
  UpdateInstagramPostsAdminResponse
} from '@/features/content/instagram-posts/admin/commands/update-instagram-posts/update-instagram-posts.admin.response';
import { InstagramPost } from '@/features/content/instagram-posts/instagram-posts.entity';

@CommandHandler(UpdateInstagramPostsAdminRequest)
export class UpdateInstagramPostsAdminHandler implements ICommandHandler<UpdateInstagramPostsAdminRequest> {
  async execute(cmd: UpdateInstagramPostsAdminRequest): Promise<UpdateInstagramPostsAdminResponse> {
    const post = await InstagramPost.findOne({ where: { id: cmd.id } });
    if (!post) throw new NotFoundException('Instagram post not found');

    if (cmd.link) post.link = cmd.link;

    if (cmd.image) {
      if (post.image && fs.existsSync(post.image)) {
        fs.rmSync(post.image);
      }
      post.image = (cmd.image as any).path;
    }

    await InstagramPost.save(post);
    return plainToInstance(UpdateInstagramPostsAdminResponse, post, { excludeExtraneousValues: true });
  }
}