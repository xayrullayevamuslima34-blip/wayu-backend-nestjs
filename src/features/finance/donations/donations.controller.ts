import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllDonationsAdminResponse } from './admin/queries/get-all-donations/get-all-donations.admin.response';
import { GetAllDonationsAdminFilters } from './admin/queries/get-all-donations/get-all-donations.admin.filters';
import { GetAllDonationsAdminRequest } from './admin/queries/get-all-donations/get-all-donations.admin.request';
import { GetOneDonationsAdminResponse } from './admin/queries/get-one-donations/get-one-donations.admin.response';
import { GetOneDonationsAdminRequest } from './admin/queries/get-one-donations/get-one-donations.admin.request';
import { CreateDonationsAdminResponse } from './admin/commands/create-donations/create-donations.admin.response';
import { CreateDonationsAdminRequest } from './admin/commands/create-donations/create-donations.admin.request';
import { CreateDonationsAdminCommand } from './admin/commands/create-donations/create-donations.admin.command';
import { UpdateDonationsAdminResponse } from './admin/commands/update-donations/update-donations.admin.response';
import { UpdateDonationsAdminRequest } from './admin/commands/update-donations/update-donations.admin.request';
import { DeleteDonationsAdminRequest } from './admin/commands/delete-donations/delete-donations.admin.request';

@Controller('admin/donations')
export class DonationsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllDonationsAdminResponse] })
  async getAll(@Query() filters: GetAllDonationsAdminFilters) {
    return await this.queryBus.execute(new GetAllDonationsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneDonationsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneDonationsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateDonationsAdminResponse })
  async create(@Body() payload: CreateDonationsAdminRequest) {
    const cmd = new CreateDonationsAdminCommand(
      payload.amount,
      payload.fullName,
      payload.date,
      payload.paidBy,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateDonationsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDonationsAdminRequest,
  ) {
    const cmd = new UpdateDonationsAdminRequest();
    cmd.id = id;
    cmd.amount = payload.amount;
    cmd.fullName = payload.fullName;
    cmd.date = payload.date;
    cmd.paidBy = payload.paidBy;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteDonationsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/donations')
export class DonationsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllDonationsAdminResponse] })
  async getAll(@Query() filters: GetAllDonationsAdminFilters) {
    return await this.queryBus.execute(new GetAllDonationsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneDonationsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneDonationsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}