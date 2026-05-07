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
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from './config/jwt.config';
import { AuthModule } from '@/features/auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '@/core/guards/role.guard';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    JwtModule.register(jwtConfig),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 50 * 5
    }),
    AuthModule,
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
  providers: [
    //{ provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],


})
export class AppModule {
}
