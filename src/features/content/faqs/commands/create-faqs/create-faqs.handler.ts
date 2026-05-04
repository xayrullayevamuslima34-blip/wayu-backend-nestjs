import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateFaqsCommand } from './create-faqs.command';
import { CreateFaqsResponse } from './create-faqs.response';
import { Faqs } from '../../faqs.entity';
import { plainToInstance } from 'class-transformer';

@CommandHandler(CreateFaqsCommand)
export class CreateFaqsHandler implements ICommandHandler<CreateFaqsCommand> {
    async execute(cmd: CreateFaqsCommand): Promise<CreateFaqsResponse> {
        const newFaq =  Faqs.create({
          question: cmd.question,
          answer: cmd.answer,
          tagsId: cmd.tagsId,
        } as Faqs)
        await Faqs.save(newFaq);
        return plainToInstance(CreateFaqsResponse, newFaq, {excludeExtraneousValues: true});
    }

}