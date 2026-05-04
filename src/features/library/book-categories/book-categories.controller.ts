import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllBookCategoriesResponse } from './queries/get-all-book-categories/get-all-book-categories.response';
import { GetAllBookCategoriesFilters } from './queries/get-all-book-categories/get-all-book-categories.filters';
import { GetAllBookCategoriesRequest } from './queries/get-all-book-categories/get-all-book-categories.request';
import { GetOneBookCategoriesResponse } from './queries/get-one-book-categories/get-one-book-categories.response';
import { GetOneBookCategoriesRequest } from './queries/get-one-book-categories/get-one-book-categories.request';
import { CreateBookCategoriesResponse } from './commands/create-book-categories/create-book-categories.response';
import { CreateBookCategoriesRequest } from './commands/create-book-categories/create-book-categories.request';
import { CreateBookCategoriesCommand } from './commands/create-book-categories/create-book-categories.command';
import { UpdateBookCategoriesResponse } from './commands/update-book-categories/update-book-categories.response';
import { UpdateBookCategoriesRequest } from './commands/update-book-categories/update-book-categories.request';
import { DeleteBookCategoriesRequest } from './commands/delete-book-categories/delete-book-categories.request';

@Controller('book-categories')
export class BookCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllBookCategoriesResponse] })
  async getAll(@Query() filters: GetAllBookCategoriesFilters) {
    return await this.queryBus.execute(new GetAllBookCategoriesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookCategoriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateBookCategoriesResponse })
  async create(@Body() payload: CreateBookCategoriesRequest) {
    const cmd = new CreateBookCategoriesCommand(payload.title);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateBookCategoriesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookCategoriesRequest,
  ) {
    const cmd = new UpdateBookCategoriesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBookCategoriesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}