import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFaqsAdminCommand } from './create-faqs.admin.command';
import { CreateFaqsAdminResponse } from './create-faqs.admin.response';
import { Faqs } from '../../../faqs.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateFaqsAdminCommand)
export class CreateFaqsAdminHandler implements ICommandHandler<CreateFaqsAdminCommand> {
    async execute(cmd: CreateFaqsAdminCommand): Promise<CreateFaqsAdminResponse> {
        const newFaq =  Faqs.create({
          question: cmd.question,
          answer: cmd.answer,
          tagsId: cmd.tagsId,
        } as Faqs)
        await Faqs.save(newFaq);
        return plainToInstance(CreateFaqsAdminResponse, newFaq, {excludeExtraneousValues: true});
    }

}