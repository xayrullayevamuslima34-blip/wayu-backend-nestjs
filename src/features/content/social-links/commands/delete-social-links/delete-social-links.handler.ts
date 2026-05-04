import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteSocialLinksRequest } from './delete-social-links.request';
import { Repository } from 'typeorm';
import { SocialLink } from '../../social-links.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteSocialLinksRequest)
export class DeleteSocialLinksHandler implements ICommandHandler<DeleteSocialLinksRequest> {
  constructor(@InjectRepository(SocialLink) private readonly repo: Repository<SocialLink>) {
  }

  async execute(cmd: DeleteSocialLinksRequest): Promise<void> {
        const newSocialLink = await this.repo.findOneBy({id: cmd.id});
        if (!newSocialLink) throw new NotFoundException("Social link with given id not found");
        await this.repo.remove(newSocialLink)
    }
}