import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllExpensesResponses } from './queries/get-all-expenses/get-all-expenses.responses';
import { GetAllExpensesFilters } from './queries/get-all-expenses/get-all-expenses.filters';
import { GetAllExpensesRequest } from './queries/get-all-expenses/get-all-expenses.request';
import { GetOneExpensesResponse } from './queries/get-one-expenses/get-one-expenses.response';
import { GetOneExpensesRequest } from './queries/get-one-expenses/get-one-expenses.request';
import { CreateExpensesResponse } from './commands/create-expenses/create-expenses.response';
import { CreateExpensesRequest } from './commands/create-expenses/create-expenses.request';
import { CreateExpensesCommand } from './commands/create-expenses/create-expenses.command';
import { UpdateExpensesResponse } from './commands/update-expenses/update-expenses.response';
import { UpdateExpensesRequest } from './commands/update-expenses/update-expenses.request';
import { DeleteExpensesRequest } from './commands/delete-expenses/delete-expenses.request';

@Controller('expenses')
export class ExpensesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllExpensesResponses] })
  async getAll(@Query() filters: GetAllExpensesFilters) {
    return await this.queryBus.execute(new GetAllExpensesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneExpensesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneExpensesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateExpensesResponse })
  async create(@Body() payload: CreateExpensesRequest) {
    const cmd = new CreateExpensesCommand(
      payload.amount,
      payload.date,
      payload.title,
      payload.transactionId,
      payload.description,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateExpensesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateExpensesRequest,
  ) {
    const cmd = new UpdateExpensesRequest();
    cmd.id = id;
    cmd.amount = payload.amount;
    cmd.date = payload.date;
    cmd.title = payload.title;
    cmd.description = payload.description;
    cmd.transactionId = payload.transactionId;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteExpensesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}