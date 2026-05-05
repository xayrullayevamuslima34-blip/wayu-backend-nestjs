import { Module } from '@nestjs/common';
import {
  QuestionsAdminController,
  QuestionsPublicController,
} from './questions/questions.controller';
import {
  GetAllQuestionsAdminHandler,
} from './questions/admin/queries/get-all-questions/get-all-questions.admin.handler';
import {
  GetOneQuestionsAdminHandler,
} from './questions/admin/queries/get-one-questions/get-one-questions.admin.handler';
import {
  CreateQuestionsAdminHandler,
} from './questions/admin/commands/create-questions/create-questions.admin.handler';
import {
  UpdateQuestionsAdminHandler,
} from './questions/admin/commands/update-questions/update-questions.admin.handler';
import {
  DeleteQuestionsAdminHandler,
} from './questions/admin/commands/delete-questions/delete-questions.admin.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from './questions/questions.entity';
import {
  GetAllQuestionsPublicHandler,
} from '@/features/questions/questions/public/queries/get-all-questions/get-all-questions.public.handler';
import {
  GetOneQuestionsPublicHandler,
} from '@/features/questions/questions/public/queries/get-one-questions/get-one-questions.public.handler';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],

  controllers: [QuestionsAdminController, QuestionsPublicController],

  providers: [
    GetAllQuestionsAdminHandler,
    GetOneQuestionsAdminHandler,
    CreateQuestionsAdminHandler,
    UpdateQuestionsAdminHandler,
    DeleteQuestionsAdminHandler,
    GetAllQuestionsPublicHandler,
    GetOneQuestionsPublicHandler,
  ],

})

export class QuestionsModule {
}