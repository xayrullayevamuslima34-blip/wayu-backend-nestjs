import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateUsefulLinksCommand } from './create-useful-links.command';
import { CreateUsefulLinksResponse } from './create-useful-links.response';
import { UsefulLink } from '../../useful-links.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateUsefulLinksCommand)
export class CreateUsefulLinksHandler implements ICommandHandler<CreateUsefulLinksCommand> {
    async execute(cmd: CreateUsefulLinksCommand): Promise<CreateUsefulLinksResponse> {
        const newUsefulLinks = UsefulLink.create({
          title: cmd.title,
          icon: cmd.icon.path,
          link: cmd.link,
        })
      await UsefulLink.save(newUsefulLinks);
        return plainToInstance(CreateUsefulLinksResponse, newUsefulLinks, {excludeExtraneousValues: true });
    }

}