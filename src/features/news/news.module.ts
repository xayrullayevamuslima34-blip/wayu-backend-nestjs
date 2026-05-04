import { Module } from '@nestjs/common';
import { NewsCategoryController } from './news-category/news-category.controller';
import { CreateNewsCategoryHandler } from './news-category/commands/create-news-category/create-news-category.handler';
import {
  GetAllNewsCategoriesHandler,
} from './news-category/queries/get-all-news-categories/get-all-news-categories.handler';
import {
  DeleteNewsCategoriesHandler,
} from './news-category/commands/delete-news-category/delete-news-category.handler';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsCategories } from './news-category/news-categories.entity';
import { News } from './news/news.entity';
import { CreateNewsHandler } from './news/admin/commands/create-news/create-news.handler';
import { NewsController } from './news/news.controller';
import { GetOneNewsHandler } from './news/admin/queries/get-one-news/get-one-news.handler';
import { UpdateNewsHandler } from './news/admin/commands/update-news/update-news.handler';
import { DeleteNewsHandler } from './news/admin/commands/delete-news/delete-news.handler';
import { GetAllNewsHandler } from './news/admin/queries/get-all-news/get-all-news.handler';
import { GetOneNewsCategoriesHandler } from './news-category/queries/get-one-news-category/get-one-news.handler';
import {
  UpdateNewsCategoriesHandler,
} from './news-category/commands/update-news-category/update-news-category.handler';
import { TagsController } from './tags/tags.controller';
import { Tags } from './tags/tags.entity';
import { GetAllTagsHandler } from './tags/queries/get-all-tags/get-all-tags.handler';
import { GetOneTagsHandler } from './tags/queries/get-one-tags/get-one-tags.handler';
import { CreateTagsHandler } from './tags/commands/create-tags/create-tags-handler';
import { UpdateTagsHandler } from './tags/commands/update-tags/update-tags.handler';
import { DeleteTagsHandler } from './tags/commands/delete-tags/delete-tags-handler';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([News, NewsCategories, Tags]),
    ConfigModule
  ],

  controllers: [NewsController,
    NewsCategoryController,
    TagsController],

  providers: [
    GetAllNewsHandler,
    GetOneNewsHandler,
    CreateNewsHandler,
    UpdateNewsHandler,
    DeleteNewsHandler,
    GetAllNewsCategoriesHandler,
    GetOneNewsCategoriesHandler,
    CreateNewsCategoryHandler,
    UpdateNewsCategoriesHandler,
    DeleteNewsCategoriesHandler,
    GetAllTagsHandler,
    GetOneTagsHandler,
    CreateTagsHandler,
    UpdateTagsHandler,
    DeleteTagsHandler,
  ],
})

export class NewsModule {
}