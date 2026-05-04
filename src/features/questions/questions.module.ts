import { Module } from '@nestjs/common';
import { QuestionsController } from './questions/questions.controller';
import { GetAllQuestionsHandler } from './questions/queries/get-all-questions/get-all-questions.handler';
import { GetOneQuestionsHandler } from './questions/queries/get-one-questions/get-one-questions.handler';
import { CreateQuestionsHandler } from './questions/commands/create-questions/create-questions.handler';
import { UpdateQuestionsHandler } from './questions/commands/update-questions/update-questions.handler';
import { DeleteQuestionsHandler } from './questions/commands/delete-questions/delete-questions.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/questions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],

  controllers: [QuestionsController],

  providers: [
    GetAllQuestionsHandler,
    GetOneQuestionsHandler,
    CreateQuestionsHandler,
    UpdateQuestionsHandler,
    DeleteQuestionsHandler,
  ],

})

export class QuestionsModule {
}