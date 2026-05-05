import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFaqsAdminRequest } from './delete-faqs.admin.request';
import { Repository } from 'typeorm';
import { Faqs } from '../../../faqs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteFaqsAdminRequest)
export class DeleteFaqsAdminHandler implements ICommandHandler<DeleteFaqsAdminRequest>{
  constructor(@InjectRepository(Faqs) private readonly repo: Repository<Faqs>) {}

  async execute(cmd: DeleteFaqsAdminRequest): Promise<void> {
        const newFaq = await this.repo.findOneBy({id: cmd.id});
        if (!newFaq) throw new NotFoundException("Faq with given id not found");

        await this.repo.remove(newFaq)
    }
}