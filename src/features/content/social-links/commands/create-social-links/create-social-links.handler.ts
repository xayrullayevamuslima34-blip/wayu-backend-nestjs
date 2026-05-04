import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateSocialLinksCommand } from './create-social-links.command';
import { CreateSocialLinksResponse } from './create-social-links.response';
import { SocialLink } from '../../social-links.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateSocialLinksCommand)
export class CreateSocialLinksHandler implements ICommandHandler<CreateSocialLinksCommand> {
  async execute(cmd: CreateSocialLinksCommand): Promise<CreateSocialLinksResponse> {
    const newSocialLinks = SocialLink.create({
      title: cmd.title,
      icon: cmd.icon.path,
      link: cmd.link,
    });
    await SocialLink.save(newSocialLinks);
    return plainToInstance(CreateSocialLinksResponse, newSocialLinks, { excludeExtraneousValues: true });
  }

}