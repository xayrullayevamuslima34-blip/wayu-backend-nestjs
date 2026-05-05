import { Command } from '@nestjs/cqrs';
import {
  CreateSocialLinksAdminResponse
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.response';

export class CreateSocialLinksAdminCommand extends Command<CreateSocialLinksAdminResponse>{
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}