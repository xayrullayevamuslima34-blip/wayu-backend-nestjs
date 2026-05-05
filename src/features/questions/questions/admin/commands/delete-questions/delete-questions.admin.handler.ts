import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteQuestionsAdminRequest } from './delete-questions.admin.request';
import { Repository } from 'typeorm';
import { Question } from '../../../questions.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteQuestionsAdminRequest)
export class DeleteQuestionsAdminHandler implements ICommandHandler<DeleteQuestionsAdminRequest> {
  constructor(@InjectRepository(Question) private readonly repo: Repository<Question>) {
  }

  async execute(cmd: DeleteQuestionsAdminRequest): Promise<void> {
    const newQuestion = await this.repo.findOneBy({ id: cmd.id });
    if (!newQuestion) throw new NotFoundException('Question with given id not found');
    await this.repo.remove(newQuestion);
  }
}