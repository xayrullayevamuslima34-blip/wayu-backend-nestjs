import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllNewsCategoriesResponse } from './queries/get-all-news-categories/get-all-news-categories.response';
import { GetAllNewsCategoriesRequest } from './queries/get-all-news-categories/get-all-news-categories.request';
import { CreateNewsCategoryResponse } from './commands/create-news-category/create-news-category.response';
import { CreateNewsCategoryRequest } from './commands/create-news-category/create-news-category.request';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetAllNewsCategoriesFilters } from './queries/get-all-news-categories/get-all-news-categories.filters';
import { DeleteNewsCategoriesCommand } from './commands/delete-news-category/delete-news-category.request';
import { GetOneNewsCategoriesResponse } from './queries/get-one-news-category/get-one-news.response';
import { GetOneNewsCategoriesQuery } from './queries/get-one-news-category/get-one-news.request';
import { UpdateNewsCategoriesResponse } from './commands/update-news-category/update-news-category.response';
import { UpdateNewsCategoriesCommand } from './commands/update-news-category/update-news-category.request';


@Controller('admin/news-category')
export class NewsCategoryController {

  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus) {
  }

  @Get("list")
  @ApiOkResponse({ type: [GetAllNewsCategoriesResponse] })
  async getAllNewsCategories(@Query() filters: GetAllNewsCategoriesFilters) {
    return await this.queryBus.execute(new GetAllNewsCategoriesRequest(filters));
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneNewsCategoriesResponse })
  async getOne(@Param('id') id: number) {
    const query = new GetOneNewsCategoriesQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateNewsCategoryResponse })
  async createNewsCategory(@Body() command: CreateNewsCategoryRequest) {
    return await this.commandBus.execute(command);
  }

  @Patch('/:id')
  @ApiOkResponse({ type: UpdateNewsCategoriesResponse })
  async update(@Param('id') id: number, @Body() payload: UpdateNewsCategoriesCommand) {
    const cmd = new UpdateNewsCategoriesCommand();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete(":id")
  async deleteNewsCategory(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsCategoriesCommand();
    cmd.id = id;
    return await this.commandBus.execute(cmd)
  }


}
