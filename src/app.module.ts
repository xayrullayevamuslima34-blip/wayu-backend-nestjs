import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { NewsModule } from './features/news/news.module';
import { CqrsModule } from '@nestjs/cqrs';
import { CommonModule } from './features/common/common.module';
import { ContentModule } from './features/content/content.module';
import { EventsModule } from './features/events/events.module';
import { FinanceModule } from './features/finance/finance.module';
import { LibraryModule } from './features/library/library.module';
import { OrganizationModule } from './features/organization/organization.module';
import { QuestionsModule } from './features/questions/questions.module';
import { RecruitmentModule } from './features/recruitment/recruitment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    CommonModule,
    ContentModule,
    EventsModule,
    FinanceModule,
    LibraryModule,
    NewsModule,
    OrganizationModule,
    QuestionsModule,
    RecruitmentModule,
  ],
})
export class AppModule {
}
