import { Injectable, NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Tags } from '../../../tags.entity';
import { DeleteTagsAdminRequest } from './delete-tags.admin.request';

@Injectable()
@CommandHandler(DeleteTagsAdminRequest)
export class DeleteTagsAdminHandler implements ICommandHandler<DeleteTagsAdminRequest> {
  async execute(cmd: DeleteTagsAdminRequest): Promise<void> {
    const tag = await Tags.findOneBy({ id: cmd.id });
    if (!tag) throw new NotFoundException('Tag not found');
    await Tags.remove(tag);
  }
}