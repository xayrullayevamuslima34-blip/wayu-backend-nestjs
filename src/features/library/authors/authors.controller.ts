import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllAuthorsAdminResponse } from './admin/queries/get-all-authors/get-all-authors.admin.response';
import { GetAllAuthorsAdminFilters } from './admin/queries/get-all-authors/get-all-authors.admin.filters';
import { GetAllAuthorsAdminRequest } from './admin/queries/get-all-authors/get-all-authors.admin.request';
import { GetOneAuthorsAdminResponse } from './admin/queries/get-one-authors/get-one-authors.admin.response';
import { GetOneAuthorsAdminRequest } from './admin/queries/get-one-authors/get-one-authors.admin.request';
import { CreateAuthorsAdminResponse } from './admin/commands/create-authors/create-authors.admin.response';
import { CreateAuthorsAdminRequest } from './admin/commands/create-authors/create-authors.admin.request';
import { CreateAuthorsAdminCommand } from './admin/commands/create-authors/create-authors.admin.command';
import { UpdateAuthorsAdminResponse } from './admin/commands/update-authors/update-authors.admin.response';
import { UpdateAuthorsAdminRequest } from './admin/commands/update-authors/update-authors.admin.request';
import { DeleteAuthorsAdminRequest } from './admin/commands/delete-authors/delete-authors.admin.request';
import {
  GetAllAuthorsPublicResponse,
} from '@/features/library/authors/public/queries/get-all-authors/get-all-authors.public.response';
import {
  GetAllAuthorsPublicFilters,
} from '@/features/library/authors/public/queries/get-all-authors/get-all-authors.public.filters';
import {
  GetAllAuthorsPublicRequest,
} from '@/features/library/authors/public/queries/get-all-authors/get-all-authors.public.request';
import {
  GetOneAuthorsPublicResponse,
} from '@/features/library/authors/public/queries/get-one-authors/get-one-authors.public.response';
import {
  GetOneAuthorsPublicRequest,
} from '@/features/library/authors/public/queries/get-one-authors/get-one-authors.public.request';

@Controller('admin/authors')
export class AuthorsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllAuthorsAdminResponse] })
  async getAll(@Query() filters: GetAllAuthorsAdminFilters) {
    return await this.queryBus.execute(new GetAllAuthorsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneAuthorsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateAuthorsAdminResponse })
  async create(@Body() payload: CreateAuthorsAdminRequest) {
    const cmd = new CreateAuthorsAdminCommand(payload.fullName);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateAuthorsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAuthorsAdminRequest,
  ) {
    const cmd = new UpdateAuthorsAdminRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteAuthorsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/authors')
export class AuthorsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllAuthorsPublicResponse] })
  async getAll(@Query() filters: GetAllAuthorsPublicFilters) {
    return await this.queryBus.execute(new GetAllAuthorsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneAuthorsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}