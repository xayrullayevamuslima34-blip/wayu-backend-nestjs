import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateFaqsRequest } from './update-faqs.request';
import { UpdateFaqsResponse } from './update-faqs.response';
import { Faqs } from '../../faqs.entity';

@CommandHandler(UpdateFaqsRequest)
export class UpdateFaqsHandler implements ICommandHandler<UpdateFaqsRequest> {
  async execute(cmd: UpdateFaqsRequest): Promise<UpdateFaqsResponse> {
    const faq = await Faqs.findOne({ where: { id: cmd.id } });
    if (!faq) throw new NotFoundException('Faq not found');

    if (cmd.question) faq.question = cmd.question;
    if (cmd.answer) faq.answer = cmd.answer;
    if (cmd.tagsId) faq.tagsId = cmd.tagsId;

    await Faqs.save(faq);
    return plainToInstance(UpdateFaqsResponse, faq, { excludeExtraneousValues: true });
  }
}