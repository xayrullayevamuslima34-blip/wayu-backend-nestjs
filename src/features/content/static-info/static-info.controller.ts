import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import {
  GetOneStaticInfoPublicResponse,
} from '@/features/content/static-info/public/queries/get-one-static-info/get-one-static-info.public.response';
import {
  GetAllStaticInfoPublicRequest,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.request';
import {
  GetAllStaticInfoPublicFilters,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.filters';
import {
  GetAllStaticInfoPublicResponse,
} from '@/features/content/static-info/public/queries/get-all-static-info/get-all-static-info.public.response';
import {
  GetOneStaticInfoPublicRequest,
} from '@/features/content/static-info/public/queries/get-one-static-info/get-one-static-info.public.request';
import {
  GetAllStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.response';
import {
  GetAllStaticInfoAdminFilters,
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.filters';
import {
  GetAllStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/queries/get-all-static-info/get-all-static-info.admin.request';
import {
  GetOneStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/queries/get-one-static-info/get-one-static-info.admin.response';
import {
  GetOneStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/queries/get-one-static-info/get-one-static-info.admin.request';
import {
  CreateStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.response';
import {
  CreateStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.request';
import {
  CreateStaticInfoAdminCommand,
} from '@/features/content/static-info/admin/commands/create-static-info/create-static-info.admin.command';
import {
  UpdateStaticInfoAdminResponse,
} from '@/features/content/static-info/admin/commands/update-static-info/update-static-info.admin.response';
import {
  UpdateStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/commands/update-static-info/update-static-info.admin.request';
import {
  DeleteStaticInfoAdminRequest,
} from '@/features/content/static-info/admin/commands/delete-static-info/delete-static-info.admin.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/static-info')
export class StaticInfoAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllStaticInfoAdminResponse] })
  async getAll(@Query() filters: GetAllStaticInfoAdminFilters) {
    return await this.queryBus.execute(new GetAllStaticInfoAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateStaticInfoAdminResponse })
  async create(@Body() payload: CreateStaticInfoAdminRequest) {
    const cmd = new CreateStaticInfoAdminCommand(
      payload.aboutUs,
      payload.appStoreLink,
      payload.playMarketLink,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateStaticInfoAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStaticInfoAdminRequest,
  ) {
    const cmd = new UpdateStaticInfoAdminRequest();
    cmd.id = id;
    cmd.appStoreLink = payload.appStoreLink;
    cmd.playMarketLink = payload.playMarketLink;
    cmd.aboutUs = payload.aboutUs;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteStaticInfoAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/static-info')
export class StaticInfoPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllStaticInfoPublicResponse] })
  async getAll(@Query() filters: GetAllStaticInfoPublicFilters) {
    return await this.queryBus.execute(new GetAllStaticInfoPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}