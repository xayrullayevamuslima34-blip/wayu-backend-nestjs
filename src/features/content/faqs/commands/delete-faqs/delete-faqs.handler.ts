import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteFaqsRequest } from './delete-faqs.request';
import { Repository } from 'typeorm';
import { Faqs } from '../../faqs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteFaqsRequest)
export class DeleteFaqsHandler implements ICommandHandler<DeleteFaqsRequest>{
  constructor(@InjectRepository(Faqs) private readonly repo: Repository<Faqs>) {}

  async execute(cmd: DeleteFaqsRequest): Promise<void> {
        const newFaq = await this.repo.findOneBy({id: cmd.id});
        if (!newFaq) throw new NotFoundException("Faq with given id not found");

        await this.repo.remove(newFaq)
    }
}