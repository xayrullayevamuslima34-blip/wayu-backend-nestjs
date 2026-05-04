import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteQuestionsRequest } from './delete-questions.request';
import { Repository } from 'typeorm';
import { Question } from '../../questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteQuestionsRequest)
export class DeleteQuestionsHandler implements ICommandHandler<DeleteQuestionsRequest> {
  constructor(@InjectRepository(Question) private readonly repo: Repository<Question>) {
  }

  async execute(cmd: DeleteQuestionsRequest): Promise<void> {
    const newQuestion = await this.repo.findOneBy({ id: cmd.id });
    if (!newQuestion) throw new NotFoundException('Question with given id not found');
    await this.repo.remove(newQuestion);
  }
}