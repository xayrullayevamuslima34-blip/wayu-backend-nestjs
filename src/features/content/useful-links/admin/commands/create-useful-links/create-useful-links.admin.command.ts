import { Command } from '@nestjs/cqrs';
import {
  CreateUsefulLinksAdminResponse
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.response';

export class CreateUsefulLinksAdminCommand extends Command<CreateUsefulLinksAdminResponse>{
  constructor(
    public title: string,
    public icon: Express.Multer.File,
    public link: string,
  ) {
    super();
  }
}