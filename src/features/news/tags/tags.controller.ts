import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllTagsAdminResponse } from './admin/queries/get-all-tags/get-all-tags.admin.response';
import { GetAllTagsAdminRequest } from './admin/queries/get-all-tags/get-all-tags.admin.request';
import { GetOneTagsAdminResponse } from './admin/queries/get-one-tags/get-one-tags.admin.response';
import { GetOneTagsAdminRequest } from './admin/queries/get-one-tags/get-one-tags.admin.request';
import { CreateTagsAdminResponse } from './admin/commands/create-tags/create-tags.admin.response';
import { CreateTagsAdminRequest } from './admin/commands/create-tags/create-tags.admin.request';
import { UpdateTagsAdminResponse } from './admin/commands/update-tags/update-tags.admin.response';
import { UpdateTagsAdminRequest } from './admin/commands/update-tags/update-tags.admin.request';
import { DeleteTagsAdminRequest } from './admin/commands/delete-tags/delete-tags.admin.request';
import { GetAllTagsAdminFilters } from '@/features/news/tags/admin/queries/get-all-tags/get-all-tags.admin.filters';
import {
  GetAllTagsPublicResponse,
} from '@/features/news/tags/public/queries/get-all-tags/get-all-tags.public.response';
import { GetAllTagsPublicFilters } from '@/features/news/tags/public/queries/get-all-tags/get-all-tags.public.filters';
import { GetAllTagsPublicRequest } from '@/features/news/tags/public/queries/get-all-tags/get-all-tags.public.request';
import {
  GetOneTagsPublicResponse,
} from '@/features/news/tags/public/queries/get-one-tags/get-one-tags.public.response';
import { GetOneTagsPublicRequest } from '@/features/news/tags/public/queries/get-one-tags/get-one-tags.public.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/tags')
export class TagsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllTagsAdminResponse] })
  async getAll(@Query() filters: GetAllTagsAdminFilters) {
    return await this.queryBus.execute(new GetAllTagsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneTagsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateTagsAdminResponse })
  async create(@Body() payload: CreateTagsAdminRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateTagsAdminResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTagsAdminRequest) {
    const cmd = new UpdateTagsAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteTagsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/tags')
export class TagsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllTagsPublicResponse] })
  async getAll(@Query() filters: GetAllTagsPublicFilters) {
    return await this.queryBus.execute(new GetAllTagsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {  // ✅ ParseIntPipe
    const query = new GetOneTagsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}