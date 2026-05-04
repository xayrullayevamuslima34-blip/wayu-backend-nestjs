import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateInstagramPostsCommand } from './create-instagram-posts.command';
import { CreateInstagramPostsResponse } from './create-instagram-posts.response';
import { InstagramPost } from '../../instagram-posts.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateInstagramPostsCommand)
export class CreateInstagramPostsHandler implements ICommandHandler<CreateInstagramPostsCommand> {
  async execute(cmd: CreateInstagramPostsCommand): Promise<CreateInstagramPostsResponse> {
    const newPost = InstagramPost.create({
      image: cmd.image.path,
      link: cmd.link,
    } as InstagramPost);
    await InstagramPost.save(newPost);
    return plainToInstance(CreateInstagramPostsResponse, newPost, { excludeExtraneousValues: true });
  }

}