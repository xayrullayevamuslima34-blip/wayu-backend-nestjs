import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllApplicationsAdminResponse } from './admin/queries/get-all-applications/get-all-applications.admin.response';
import { GetAllApplicationsAdminFilters } from './admin/queries/get-all-applications/get-all-applications.admin.filters';
import { GetAllApplicationsAdminRequest } from './admin/queries/get-all-applications/get-all-applications.admin.request';
import { GetOneApplicationsAdminResponse } from './admin/queries/get-one-applications/get-one-applications.admin.response';
import { GetOneApplicationsAdminRequest } from './admin/queries/get-one-applications/get-one-applications.admin.request';
import { CreateApplicationsAdminResponse } from './admin/commands/create-applications/create-applications.admin.response';
import { CreateApplicationsAdminRequest } from './admin/commands/create-applications/create-applications.admin.request';
import { CreateApplicationsAdminCommand } from './admin/commands/create-applications/create-applications.admin.command';
import { UpdateApplicationsAdminResponse } from './admin/commands/update-applications/update-applications.admin.response';
import { UpdateApplicationsAdminRequest } from './admin/commands/update-applications/update-applications.admin.request';
import { DeleteApplicationsAdminRequest } from './admin/commands/delete-applications/delete-applications.admin.request';
import {
  GetAllApplicationsPublicResponse
} from '@/features/recruitment/applications/public/queries/get-all-applications/get-all-applications.public.response';
import {
  GetAllApplicationsPublicFilters
} from '@/features/recruitment/applications/public/queries/get-all-applications/get-all-applications.public.filters';
import {
  GetAllApplicationsPublicRequest
} from '@/features/recruitment/applications/public/queries/get-all-applications/get-all-applications.public.request';
import {
  GetOneApplicationsPublicResponse
} from '@/features/recruitment/applications/public/queries/get-one-applications/get-one-applications.public.response';
import {
  GetOneApplicationsPublicRequest
} from '@/features/recruitment/applications/public/queries/get-one-applications/get-one-applications.public.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/applications')
export class ApplicationsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllApplicationsAdminResponse] })
  async getAll(@Query() filters: GetAllApplicationsAdminFilters) {
    return await this.queryBus.execute(new GetAllApplicationsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateApplicationsAdminResponse })
  async create(@Body() payload: CreateApplicationsAdminRequest) {
    const cmd = new CreateApplicationsAdminCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      payload.resume,
      payload.status,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateApplicationsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateApplicationsAdminRequest,
  ) {
    const cmd = new UpdateApplicationsAdminRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.email = payload.email;
    cmd.vacancyId = payload.vacancyId;
    cmd.status = payload.status;
    cmd.resume = payload.resume;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteApplicationsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/applications')
export class ApplicationsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllApplicationsPublicResponse] })
  async getAll(@Query() filters: GetAllApplicationsPublicFilters) {
    return await this.queryBus.execute(new GetAllApplicationsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}