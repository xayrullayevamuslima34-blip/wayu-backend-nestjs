import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import fs from 'fs';
import { UpdateInstagramPostsRequest } from './update-instagram-posts.request';
import { UpdateInstagramPostsResponse } from './update-instagram-posts.response';
import { InstagramPost } from '../../instagram-posts.entity';

@CommandHandler(UpdateInstagramPostsRequest)
export class UpdateInstagramPostsHandler implements ICommandHandler<UpdateInstagramPostsRequest> {
  async execute(cmd: UpdateInstagramPostsRequest): Promise<UpdateInstagramPostsResponse> {
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
    return plainToInstance(UpdateInstagramPostsResponse, post, { excludeExtraneousValues: true });
  }
}