import { Module } from '@nestjs/common';
import {
  NewsCategoryAdminController,
  NewsCategoryPublicController,
} from './news-category/news-category.controller';
import {
  CreateNewsCategoryAdminHandler,
} from './news-category/admin/commands/create-news-category/create-news-category.admin.handler';
import {
  GetAllNewsCategoriesAdminHandler,
} from './news-category/admin/queries/get-all-news-categories/get-all-news-categories.admin.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategories } from './news-category/news-categories.entity';
import { News } from './news/news.entity';
import { CreateNewsAdminHandler } from './news/admin/commands/create-news/create-news.admin.handler';
import { NewsAdminController, NewsPublicController } from './news/news.controller';
import { GetOneNewsAdminHandler } from './news/admin/queries/get-one-news/get-one-news.admin.handler';
import { UpdateNewsAdminHandler } from './news/admin/commands/update-news/update-news.admin.handler';
import { DeleteNewsAdminHandler } from './news/admin/commands/delete-news/delete-news.admin.handler';
import { GetAllNewsAdminHandler } from './news/admin/queries/get-all-news/get-all-news.admin.handler';
import { TagsAdminController, TagsPublicController } from './tags/tags.controller';
import { Tags } from './tags/tags.entity';
import { GetAllTagsAdminHandler } from './tags/admin/queries/get-all-tags/get-all-tags.admin.handler';
import { GetOneTagsAdminHandler } from './tags/admin/queries/get-one-tags/get-one-tags.admin.handler';
import { CreateTagsAdminHandler } from './tags/admin/commands/create-tags/create-tags.admin.handler';
import { UpdateTagsAdminHandler } from './tags/admin/commands/update-tags/update-tags.admin.handler';
import { DeleteTagsAdminHandler } from './tags/admin/commands/delete-tags/delete-tags.admin.handler';
import { ConfigModule } from '@nestjs/config';
import {
  GetAllNewsCategoriesPublicHandler,
} from '@/features/news/news-category/public/queries/get-all-news-categories/get-all-news-categories.public.handler';
import {
  GetOneNewsCategoryAdminHandler,
} from '@/features/news/news-category/admin/queries/get-one-news-category/get-one-news-category.admin.handler';
import {
  UpdateNewsCategoryAdminHandler,
} from '@/features/news/news-category/admin/commands/update-news-category/update-news-category.admin.handler';
import {
  DeleteNewsCategoryAdminHandler,
} from '@/features/news/news-category/admin/commands/delete-news-category/delete-news-category.admin.handler';
import {
  GetOneNewsCategoryPublicHandler,
} from '@/features/news/news-category/public/queries/get-one-news-category/get-one-news-category.public.handler';
import { GetAllNewsPublicHandler } from '@/features/news/news/public/queries/get-all-news/get-all-news.public.handler';
import { GetOneNewsPublicHandler } from '@/features/news/news/public/queries/get-one-news/get-one-news.public.handler';
import { GetAllTagsPublicHandler } from '@/features/news/tags/public/queries/get-all-tags/get-all-tags.public.handler';
import { GetOneTagsPublicHandler } from '@/features/news/tags/public/queries/get-one-tags/get-one-tags.public.handler';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, NewsCategories, Tags]),
    ConfigModule,
  ],

  controllers: [NewsAdminController, NewsPublicController,
    NewsCategoryAdminController, NewsCategoryPublicController,
    TagsAdminController, TagsPublicController,
  ],

  providers: [
    GetAllNewsAdminHandler,
    GetOneNewsAdminHandler,
    CreateNewsAdminHandler,
    UpdateNewsAdminHandler,
    DeleteNewsAdminHandler,
    GetAllNewsPublicHandler,
    GetOneNewsPublicHandler,

    GetAllNewsCategoriesAdminHandler,
    GetOneNewsCategoryAdminHandler,
    CreateNewsCategoryAdminHandler,
    UpdateNewsCategoryAdminHandler,
    DeleteNewsCategoryAdminHandler,
    GetAllNewsCategoriesPublicHandler,
    GetOneNewsCategoryPublicHandler,

    GetAllTagsAdminHandler,
    GetOneTagsAdminHandler,
    CreateTagsAdminHandler,
    UpdateTagsAdminHandler,
    DeleteTagsAdminHandler,
    GetAllTagsPublicHandler,
    GetOneTagsPublicHandler,
  ],
})

export class NewsModule {
}