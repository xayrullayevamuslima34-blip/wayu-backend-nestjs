import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllApplicationsResponse } from './queries/get-all-applications/get-all-applications.response';
import { GetAllApplicationsFilters } from './queries/get-all-applications/get-all-applications.filters';
import { GetAllApplicationsRequest } from './queries/get-all-applications/get-all-applications.request';
import { GetOneApplicationsResponse } from './queries/get-one-applications/get-one-applications.response';
import { GetOneApplicationsRequest } from './queries/get-one-applications/get-one-applications.request';
import { CreateApplicationsResponse } from './commands/create-applications/create-applications.response';
import { CreateApplicationsRequest } from './commands/create-applications/create-applications.request';
import { CreateApplicationsCommand } from './commands/create-applications/create-applications.command';
import { UpdateApplicationsResponse } from './commands/update-applications/update-applications.response';
import { UpdateApplicationsRequest } from './commands/update-applications/update-applications.request';
import { DeleteApplicationsRequest } from './commands/delete-applications/delete-applications.request';

@Controller('applications')
export class ApplicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllApplicationsResponse] })
  async getAll(@Query() filters: GetAllApplicationsFilters) {
    return await this.queryBus.execute(new GetAllApplicationsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneApplicationsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateApplicationsResponse })
  async create(@Body() payload: CreateApplicationsRequest) {
    const cmd = new CreateApplicationsCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      payload.resume,  // ✅ string
      payload.status,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateApplicationsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateApplicationsRequest,
  ) {
    const cmd = new UpdateApplicationsRequest();
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
    const cmd = new DeleteApplicationsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}