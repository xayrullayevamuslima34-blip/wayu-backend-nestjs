import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteEventCategoriesRequest } from './delete-event-categories.request';
import { Repository } from 'typeorm';
import { EventCategories } from '../../event-categories.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@CommandHandler(DeleteEventCategoriesRequest)
export class DeleteEventCategoriesHandler implements ICommandHandler<DeleteEventCategoriesRequest>{
  constructor(@InjectRepository(EventCategories) private readonly repo: Repository<EventCategories>) {}

  async execute(cmd: DeleteEventCategoriesRequest): Promise<void> {
        const newEventCategory = await this.repo.findOneBy({ id: cmd.id });
        if (!newEventCategory) throw new NotFoundException("Event category with given id not found");
        await this.repo.remove(newEventCategory);
    }

}