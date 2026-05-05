import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  CreateInstagramPostsAdminCommand
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.command';
import {
  CreateInstagramPostsAdminResponse
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.response';
import { InstagramPost } from '@/features/content/instagram-posts/instagram-posts.entity';

@CommandHandler(CreateInstagramPostsAdminCommand)
export class CreateInstagramPostsAdminHandler implements ICommandHandler<CreateInstagramPostsAdminCommand> {
  async execute(cmd: CreateInstagramPostsAdminCommand): Promise<CreateInstagramPostsAdminResponse> {
    const newPost = InstagramPost.create({
      image: cmd.image.path,
      link: cmd.link,
    } as InstagramPost);
    await InstagramPost.save(newPost);
    return plainToInstance(CreateInstagramPostsAdminResponse, newPost, { excludeExtraneousValues: true });
  }

}