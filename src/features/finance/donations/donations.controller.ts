import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllDonationsResponse } from './queries/get-all-donations/get-all-donations.response';
import { GetAllDonationsFilters } from './queries/get-all-donations/get-all-donations.filters';
import { GetAllDonationsRequest } from './queries/get-all-donations/get-all-donations.request';
import { GetOneDonationsResponse } from './queries/get-one-donations/get-one-donations.response';
import { GetOneDonationsRequest } from './queries/get-one-donations/get-one-donations.request';
import { CreateDonationsResponse } from './commands/create-donations/create-donations.response';
import { CreateDonationsRequest } from './commands/create-donations/create-donations.request';
import { CreateDonationsCommand } from './commands/create-donations/create-donations.command';
import { UpdateDonationsResponse } from './commands/update-donations/update-donations.response';
import { UpdateDonationsRequest } from './commands/update-donations/update-donations.request';
import { DeleteDonationsRequest } from './commands/delete-donations/delete-donations.request';

@Controller('donations')
export class DonationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllDonationsResponse] })
  async getAll(@Query() filters: GetAllDonationsFilters) {
    return await this.queryBus.execute(new GetAllDonationsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneDonationsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneDonationsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateDonationsResponse })
  async create(@Body() payload: CreateDonationsRequest) {
    const cmd = new CreateDonationsCommand(
      payload.amount,
      payload.fullName,
      payload.date,
      payload.paidBy,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateDonationsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateDonationsRequest,
  ) {
    const cmd = new UpdateDonationsRequest();
    cmd.id = id;
    cmd.amount = payload.amount;
    cmd.fullName = payload.fullName;
    cmd.date = payload.date;
    cmd.paidBy = payload.paidBy;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteDonationsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}