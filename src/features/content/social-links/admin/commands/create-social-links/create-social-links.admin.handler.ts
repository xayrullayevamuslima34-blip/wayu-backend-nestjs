import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import {
  CreateSocialLinksAdminCommand
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.command';
import {
  CreateSocialLinksAdminResponse
} from '@/features/content/social-links/admin/commands/create-social-links/create-social-links.admin.response';
import { SocialLink } from '@/features/content/social-links/social-links.entity';

@CommandHandler(CreateSocialLinksAdminCommand)
export class CreateSocialLinksAdminHandler implements ICommandHandler<CreateSocialLinksAdminCommand> {
  async execute(cmd: CreateSocialLinksAdminCommand): Promise<CreateSocialLinksAdminResponse> {
    const newSocialLinks = SocialLink.create({
      title: cmd.title,
      icon: cmd.icon.path,
      link: cmd.link,
    });
    await SocialLink.save(newSocialLinks);
    return plainToInstance(CreateSocialLinksAdminResponse, newSocialLinks, { excludeExtraneousValues: true });
  }

}