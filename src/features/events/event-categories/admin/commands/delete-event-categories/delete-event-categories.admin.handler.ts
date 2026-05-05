import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Repository } from 'typeorm';
import { EventCategories } from '../../../event-categories.entity';
import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeleteEventCategoriesAdminRequest
} from '@/features/events/event-categories/admin/commands/delete-event-categories/delete-event-categories.admin.request';

@CommandHandler(DeleteEventCategoriesAdminRequest)
export class DeleteEventCategoriesAdminHandler implements ICommandHandler<DeleteEventCategoriesAdminRequest>{
  constructor(@InjectRepository(EventCategories) private readonly repo: Repository<EventCategories>) {}

  async execute(cmd: DeleteEventCategoriesAdminRequest): Promise<void> {
        const newEventCategory = await this.repo.findOneBy({ id: cmd.id });
        if (!newEventCategory) throw new NotFoundException("Event category with given id not found");
        await this.repo.remove(newEventCategory);
    }

}