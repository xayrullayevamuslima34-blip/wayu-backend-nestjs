import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  GetAllEventCategoriesAdminResponse,
} from './admin/queries/get-all-event-categories/get-all-event-categories.admin.response';
import {
  GetAllEventCategoriesAdminFilter,
} from './admin/queries/get-all-event-categories/get-all-event-categories.admin.filter';
import {
  GetAllEventCategoriesAdminRequest,
} from './admin/queries/get-all-event-categories/get-all-event-categories.admin.request';
import {
  GetOneEventCategoriesAdminResponse,
} from './admin/queries/get-one-event-categories/get-one-event-categories.admin.response';
import {
  GetOneEventCategoriesAdminRequest,
} from './admin/queries/get-one-event-categories/get-one-event-categories.admin.request';
import {
  CreateEventCategoriesAdminResponse,
} from './admin/commands/create-event-categories/create-event-categories.admin.response';
import {
  CreateEventCategoriesAdminRequest,
} from './admin/commands/create-event-categories/create-event-categories.admin.request';
import {
  CreateEventCategoriesAdminCommand,
} from './admin/commands/create-event-categories/create-event-categories.admin.command';
import {
  UpdateEventCategoriesAdminResponse,
} from './admin/commands/update-event-categories/update-event-categories.admin.response';
import {
  UpdateEventCategoriesAdminRequest,
} from './admin/commands/update-event-categories/update-event-categories.admin.request';
import {
  DeleteEventCategoriesAdminRequest,
} from '@/features/events/event-categories/admin/commands/delete-event-categories/delete-event-categories.admin.request';
import {
  GetAllEventCategoriesPublicResponse,
} from '@/features/events/event-categories/public/queries/get-all-event-categories/get-all-event-categories.public.response';
import {
  GetAllEventCategoriesPublicFilter,
} from '@/features/events/event-categories/public/queries/get-all-event-categories/get-all-event-categories.public.filter';
import {
  GetAllEventCategoriesPublicRequest,
} from '@/features/events/event-categories/public/queries/get-all-event-categories/get-all-event-categories.public.request';
import {
  GetOneEventCategoriesPublicResponse,
} from '@/features/events/event-categories/public/queries/get-one-event-categories/get-one-event-categories.public.response';
import {
  GetOneEventCategoriesPublicRequest,
} from '@/features/events/event-categories/public/queries/get-one-event-categories/get-one-event-categories.public.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('public/event-categories')
export class EventCategoriesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllEventCategoriesAdminResponse] })
  async getAll(@Query() filters: GetAllEventCategoriesAdminFilter) {
    return await this.queryBus.execute(new GetAllEventCategoriesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoriesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoriesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateEventCategoriesAdminResponse })
  async create(@Body() payload: CreateEventCategoriesAdminRequest) {
    const cmd = new CreateEventCategoriesAdminCommand(payload.title);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateEventCategoriesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventCategoriesAdminRequest,
  ) {
    const cmd = new UpdateEventCategoriesAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventCategoriesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/event-categories')
export class EventCategoriesPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllEventCategoriesPublicResponse] })
  async getAll(@Query() filters: GetAllEventCategoriesPublicFilter) {
    return await this.queryBus.execute(new GetAllEventCategoriesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoriesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoriesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}