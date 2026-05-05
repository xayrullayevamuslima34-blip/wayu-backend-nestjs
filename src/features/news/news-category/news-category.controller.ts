import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  GetAllNewsCategoriesAdminResponse,
} from './admin/queries/get-all-news-categories/get-all-news-categories.admin.response';
import {
  GetAllNewsCategoriesAdminRequest,
} from './admin/queries/get-all-news-categories/get-all-news-categories.admin.request';
import {
  CreateNewsCategoryAdminResponse,
} from './admin/commands/create-news-category/create-news-category.admin.response';
import {
  CreateNewsCategoryAdminRequest,
} from './admin/commands/create-news-category/create-news-category.admin.request';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import {
  GetAllNewsCategoriesAdminFilters,
} from './admin/queries/get-all-news-categories/get-all-news-categories.admin.filters';
import {
  UpdateNewsCategoryAdminResponse,
} from './admin/commands/update-news-category/update-news-category.admin.response';
import {
  GetOneNewsCategoryAdminResponse,
} from '@/features/news/news-category/admin/queries/get-one-news-category/get-one-news-category.admin.response';
import {
  GetOneNewsCategoryAdminRequest,
} from '@/features/news/news-category/admin/queries/get-one-news-category/get-one-news-category.admin.request';
import {
  UpdateNewsCategoryAdminRequest,
} from '@/features/news/news-category/admin/commands/update-news-category/update-news-category.admin.request';
import {
  DeleteNewsCategoryAdminRequest,
} from '@/features/news/news-category/admin/commands/delete-news-category/delete-news-category.admin.request';


@Controller('admin/news-category')
export class NewsCategoryAdminController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllNewsCategoriesAdminResponse] })
  async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesAdminFilters) {
    return await this.queryBus.execute(new GetAllNewsCategoriesAdminRequest(filters));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneNewsCategoryAdminResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneNewsCategoryAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateNewsCategoryAdminResponse })
  async createNewsCategory(@Body() command: CreateNewsCategoryAdminRequest) {
    return await this.commandBus.execute(command);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateNewsCategoryAdminResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateNewsCategoryAdminRequest) {
    const cmd = new UpdateNewsCategoryAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCategoryAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/news-category')
export class NewsCategoryPublicController {

  constructor(
    private readonly queryBus: QueryBus) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllNewsCategoriesAdminResponse] })
  async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesAdminFilters) {
    return await this.queryBus.execute(new GetAllNewsCategoriesAdminRequest(filters));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneNewsCategoryAdminResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneNewsCategoryAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}
