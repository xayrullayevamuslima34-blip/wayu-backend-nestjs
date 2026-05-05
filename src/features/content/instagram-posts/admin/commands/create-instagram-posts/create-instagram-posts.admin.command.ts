import { Command } from '@nestjs/cqrs';
import {
  CreateInstagramPostsAdminResponse
} from '@/features/content/instagram-posts/admin/commands/create-instagram-posts/create-instagram-posts.admin.response';

export class CreateInstagramPostsAdminCommand extends Command<CreateInstagramPostsAdminResponse>{
  constructor(
    public image: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}