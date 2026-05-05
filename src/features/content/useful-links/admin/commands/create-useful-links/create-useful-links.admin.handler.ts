import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  CreateUsefulLinksAdminCommand,
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.command';
import {
  CreateUsefulLinksAdminResponse,
} from '@/features/content/useful-links/admin/commands/create-useful-links/create-useful-links.admin.response';
import { UsefulLink } from '@/features/content/useful-links/useful-links.entity';

@CommandHandler(CreateUsefulLinksAdminCommand)
export class CreateUsefulLinksAdminHandler implements ICommandHandler<CreateUsefulLinksAdminCommand> {
  async execute(cmd: CreateUsefulLinksAdminCommand): Promise<CreateUsefulLinksAdminResponse> {
    const newUsefulLinks = UsefulLink.create({
      title: cmd.title,
      icon: cmd.icon.path,
      link: cmd.link,
    });
    await UsefulLink.save(newUsefulLinks);
    return plainToInstance(CreateUsefulLinksAdminResponse, newUsefulLinks, { excludeExtraneousValues: true });
  }

}