import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllExpensesAdminResponses } from './admin/queries/get-all-expenses/get-all-expenses.admin.responses';
import { GetAllExpensesAdminFilters } from './admin/queries/get-all-expenses/get-all-expenses.admin.filters';
import { GetAllExpensesAdminRequest } from './admin/queries/get-all-expenses/get-all-expenses.admin.request';
import { GetOneExpensesAdminResponse } from './admin/queries/get-one-expenses/get-one-expenses.admin.response';
import { GetOneExpensesAdminRequest } from './admin/queries/get-one-expenses/get-one-expenses.admin.request';
import { CreateExpensesAdminResponse } from './admin/commands/create-expenses/create-expenses.admin.response';
import { CreateExpensesAdminRequest } from './admin/commands/create-expenses/create-expenses.admin.request';
import { CreateExpensesAdminCommand } from './admin/commands/create-expenses/create-expenses.admin.command';
import { UpdateExpensesAdminResponse } from './admin/commands/update-expenses/update-expenses.admin.response';
import { UpdateExpensesAdminRequest } from './admin/commands/update-expenses/update-expenses.admin.request';
import { DeleteExpensesAdminRequest } from './admin/commands/delete-expenses/delete-expenses.admin.request';
import {
  GetAllExpensesPublicResponses,
} from '@/features/finance/expenses/public/queries/get-all-expenses/get-all-expenses.public.responses';
import {
  GetAllExpensesPublicFilters,
} from '@/features/finance/expenses/public/queries/get-all-expenses/get-all-expenses.public.filters';
import {
  GetAllExpensesPublicRequest,
} from '@/features/finance/expenses/public/queries/get-all-expenses/get-all-expenses.public.request';
import {
  GetOneExpensesPublicResponse,
} from '@/features/finance/expenses/public/queries/get-one-expenses/get-one-expenses.public.response';
import {
  GetOneExpensesPublicRequest,
} from '@/features/finance/expenses/public/queries/get-one-expenses/get-one-expenses.public.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/expenses')
export class ExpensesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllExpensesAdminResponses] })
  async getAll(@Query() filters: GetAllExpensesAdminFilters) {
    return await this.queryBus.execute(new GetAllExpensesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneExpensesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneExpensesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateExpensesAdminResponse })
  async create(@Body() payload: CreateExpensesAdminRequest) {
    const cmd = new CreateExpensesAdminCommand(
      payload.amount,
      payload.date,
      payload.title,
      payload.transactionId,
      payload.description,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateExpensesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateExpensesAdminRequest,
  ) {
    const cmd = new UpdateExpensesAdminRequest();
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
    const cmd = new DeleteExpensesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/expenses')
export class ExpensesPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllExpensesPublicResponses] })
  async getAll(@Query() filters: GetAllExpensesPublicFilters) {
    return await this.queryBus.execute(new GetAllExpensesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneExpensesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneExpensesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}


