import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllBranchesAdminResponse } from './admin/queries/get-all-branches/get-all-branches.admin.response';
import { GetAllBranchesAdminFilters } from './admin/queries/get-all-branches/get-all-branches.admin.filters';
import { GetAllBranchesAdminRequest } from './admin/queries/get-all-branches/get-all-branches.admin.request';
import { GetOneBranchesAdminResponse } from './admin/queries/get-one-branches/get-one-branches.admin.response';
import { GetOneBranchesAdminRequest } from './admin/queries/get-one-branches/get-one-branches.admin.request';
import { CreateBranchesAdminResponse } from './admin/commands/create-branches/create-branches.admin.response';
import { CreateBranchesAdminRequest } from './admin/commands/create-branches/create-branches.admin.request';
import { CreateBranchesAdminCommand } from './admin/commands/create-branches/create-branches.admin.command';
import { UpdateBranchesAdminResponse } from './admin/commands/update-branches/update-branches.admin.response';
import { UpdateBranchesAdminRequest } from './admin/commands/update-branches/update-branches.admin.request';
import { DeleteBranchesAdminRequest } from './admin/commands/delete-branches/delete-branches.admin.request';
import {
  GetAllBranchesPublicResponse,
} from '@/features/organization/branches/public/queries/get-all-branches/get-all-branches.public.response';
import {
  GetAllBranchesPublicFilters,
} from '@/features/organization/branches/public/queries/get-all-branches/get-all-branches.public.filters';
import {
  GetAllBranchesPublicRequest,
} from '@/features/organization/branches/public/queries/get-all-branches/get-all-branches.public.request';
import {
  GetOneBranchesPublicResponse,
} from '@/features/organization/branches/public/queries/get-one-branches/get-one-branches.public.response';
import {
  GetOneBranchesPublicRequest,
} from '@/features/organization/branches/public/queries/get-one-branches/get-one-branches.public.request';

@Controller('admin/branches')
export class BranchesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllBranchesAdminResponse] })
  async getAll(@Query() filters: GetAllBranchesAdminFilters) {
    return await this.queryBus.execute(new GetAllBranchesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateBranchesAdminResponse })
  async create(@Body() payload: CreateBranchesAdminRequest) {
    const cmd = new CreateBranchesAdminCommand(
      payload.countryId,
      payload.representativeId,
      payload.city,
      payload.latitude,
      payload.longitude,
      payload.phoneNumber,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateBranchesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBranchesAdminRequest,
  ) {
    const cmd = new UpdateBranchesAdminRequest();
    cmd.id = id;
    cmd.countryId = payload.countryId;
    cmd.representativeId = payload.representativeId;
    cmd.city = payload.city;
    cmd.latitude = payload.latitude;
    cmd.longitude = payload.longitude;
    cmd.phoneNumber = payload.phoneNumber;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBranchesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/branches')
export class BranchesPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllBranchesPublicResponse] })
  async getAll(@Query() filters: GetAllBranchesPublicFilters) {
    return await this.queryBus.execute(new GetAllBranchesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}