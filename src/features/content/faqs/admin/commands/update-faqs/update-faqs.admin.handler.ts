import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { plainToInstance } from 'class-transformer';
import { UpdateFaqsAdminRequest } from './update-faqs.admin.request';
import { UpdateFaqsAdminResponse } from './update-faqs.admin.response';
import { Faqs } from '../../../faqs.entity';

@CommandHandler(UpdateFaqsAdminRequest)
export class UpdateFaqsAdminHandler implements ICommandHandler<UpdateFaqsAdminRequest> {
  async execute(cmd: UpdateFaqsAdminRequest): Promise<UpdateFaqsAdminResponse> {
    const faq = await Faqs.findOne({ where: { id: cmd.id } });
    if (!faq) throw new NotFoundException('Faq not found');

    if (cmd.question) faq.question = cmd.question;
    if (cmd.answer) faq.answer = cmd.answer;
    if (cmd.tagsId) faq.tagsId = cmd.tagsId;

    await Faqs.save(faq);
    return plainToInstance(UpdateFaqsAdminResponse, faq, { excludeExtraneousValues: true });
  }
}