import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { CreateLanguagesAdminResponse } from './admin/commands/create-languages/create-languages.admin.response';
import { CreateLanguagesAdminRequest } from './admin/commands/create-languages/create-languages.admin.request';
import { CreateLanguagesAdminCommand } from './admin/commands/create-languages/create-languages.admin.command';
import { UpdateLanguagesAdminResponse } from './admin/commands/update-languages/update-languages.admin.response';
import { UpdateLanguagesAdminRequest } from './admin/commands/update-languages/update-languages.admin.request';
import { DeleteLanguagesAdminRequest } from './admin/commands/delete-languages/delete-languages.admin.request';
import {
  GetAllLanguagesAdminResponse
} from '@/features/common/languages/admin/queries/get-all-languages/get-all-languages.admin.response';
import {
  GetAllLanguagesAdminFilters
} from '@/features/common/languages/admin/queries/get-all-languages/get-all-languages.admin.filters';
import {
  GetAllLanguagesAdminRequest
} from '@/features/common/languages/admin/queries/get-all-languages/get-all-languages.admin.request';
import {
  GetOneLanguagesAdminResponse
} from '@/features/common/languages/admin/queries/get-one-languages/get-one-languages.admin.response';
import {
  GetOneLanguagesAdminRequest
} from '@/features/common/languages/admin/queries/get-one-languages/get-one-languages.admin.request';
import {
  GetAllLanguagesPublicResponse
} from '@/features/common/languages/public/queries/get-all-languages/get-all-languages.public.response';
import {
  GetAllLanguagesPublicFilters
} from '@/features/common/languages/public/queries/get-all-languages/get-all-languages.public.filters';
import {
  GetAllLanguagesPublicRequest
} from '@/features/common/languages/public/queries/get-all-languages/get-all-languages.public.request';
import {
  GetOneLanguagesPublicRequest
} from '@/features/common/languages/public/queries/get-one-languages/get-one-languages.public.request';

@Controller('admin/languages')
export class LanguagesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllLanguagesAdminResponse] })
  async getAll(@Query() filters: GetAllLanguagesAdminFilters) {
    return await this.queryBus.execute(new GetAllLanguagesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguagesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneLanguagesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateLanguagesAdminResponse })
  async create(@Body() payload: CreateLanguagesAdminRequest) {
    const cmd = new CreateLanguagesAdminCommand(payload.title);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateLanguagesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLanguagesAdminRequest,
  ) {
    const cmd = new UpdateLanguagesAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteLanguagesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


function GetOneLanguagesPublicResponse() {

}

@Controller('public/languages')
export class LanguagesPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllLanguagesPublicResponse] })
  async getAll(@Query() filters: GetAllLanguagesPublicFilters) {
    return await this.queryBus.execute(new GetAllLanguagesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguagesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneLanguagesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}
