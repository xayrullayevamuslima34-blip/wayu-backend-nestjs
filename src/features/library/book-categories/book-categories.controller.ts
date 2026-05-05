import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  GetAllBookCategoriesAdminResponse,
} from './admin/queries/get-all-book-categories/get-all-book-categories.admin.response';
import {
  GetAllBookCategoriesAdminFilters,
} from './admin/queries/get-all-book-categories/get-all-book-categories.admin.filters';
import {
  GetAllBookCategoriesAdminRequest,
} from './admin/queries/get-all-book-categories/get-all-book-categories.admin.request';
import {
  GetOneBookCategoriesAdminResponse,
} from './admin/queries/get-one-book-categories/get-one-book-categories.admin.response';
import {
  GetOneBookCategoriesAdminRequest,
} from './admin/queries/get-one-book-categories/get-one-book-categories.admin.request';
import {
  CreateBookCategoriesAdminResponse,
} from './admin/commands/create-book-categories/create-book-categories.admin.response';
import {
  CreateBookCategoriesAdminRequest,
} from './admin/commands/create-book-categories/create-book-categories.admin.request';
import {
  CreateBookCategoriesAdminCommand,
} from './admin/commands/create-book-categories/create-book-categories.admin.command';
import {
  UpdateBookCategoriesAdminResponse,
} from './admin/commands/update-book-categories/update-book-categories.admin.response';
import {
  UpdateBookCategoriesAdminRequest,
} from './admin/commands/update-book-categories/update-book-categories.admin.request';
import {
  DeleteBookCategoriesAdminRequest,
} from './admin/commands/delete-book-categories/delete-book-categories.admin.request';
import {
  GetAllBookCategoriesPublicResponse,
} from '@/features/library/book-categories/public/queries/get-all-book-categories/get-all-book-categories.public.response';
import {
  GetAllBookCategoriesPublicFilters,
} from '@/features/library/book-categories/public/queries/get-all-book-categories/get-all-book-categories.public.filters';
import {
  GetAllBookCategoriesPublicRequest,
} from '@/features/library/book-categories/public/queries/get-all-book-categories/get-all-book-categories.public.request';
import {
  GetOneBookCategoriesPublicResponse,
} from '@/features/library/book-categories/public/queries/get-one-book-categories/get-one-book-categories.public.response';
import {
  GetOneBookCategoriesPublicRequest,
} from '@/features/library/book-categories/public/queries/get-one-book-categories/get-one-book-categories.public.request';

@Controller('admin/book-categories')
export class BookCategoriesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllBookCategoriesAdminResponse] })
  async getAll(@Query() filters: GetAllBookCategoriesAdminFilters) {
    return await this.queryBus.execute(new GetAllBookCategoriesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoriesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookCategoriesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateBookCategoriesAdminResponse })
  async create(@Body() payload: CreateBookCategoriesAdminRequest) {
    const cmd = new CreateBookCategoriesAdminCommand(payload.title);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateBookCategoriesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBookCategoriesAdminRequest,
  ) {
    const cmd = new UpdateBookCategoriesAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBookCategoriesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/book-categories')
export class BookCategoriesPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllBookCategoriesPublicResponse] })
  async getAll(@Query() filters: GetAllBookCategoriesPublicFilters) {
    return await this.queryBus.execute(new GetAllBookCategoriesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBookCategoriesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBookCategoriesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}
