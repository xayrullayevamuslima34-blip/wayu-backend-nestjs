import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllEventCategoriesResponse } from './queries/get-all-event-categories/get-all-event-categories.response';
import { GetAllEventCategoriesFilter } from './queries/get-all-event-categories/get-all-event-categories.filter';
import { GetAllEventCategoriesRequest } from './queries/get-all-event-categories/get-all-event-categories.request';
import { GetOneEventCategoriesResponse } from './queries/get-one-event-categories/get-one-event-categories.response';
import { GetOneEventCategoriesRequest } from './queries/get-one-event-categories/get-one-event-categories.request';
import { CreateEventCategoriesResponse } from './commands/create-event-categories/create-event-categories.response';
import { CreateEventCategoriesRequest } from './commands/create-event-categories/create-event-categories.request';
import { CreateEventCategoriesCommand } from './commands/create-event-categories/create-event-categories.command';
import { UpdateEventCategoriesResponse } from './commands/update-event-categories/update-event-categories.response';
import { UpdateEventCategoriesRequest } from './commands/update-event-categories/update-event-categories.request';
import { DeleteEventCategoriesRequest } from './commands/delete-event-categories/delete-event-categories.request';

@Controller('event-categories')
export class EventCategoriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllEventCategoriesResponse] })
  async getAll(@Query() filters: GetAllEventCategoriesFilter) {
    return await this.queryBus.execute(new GetAllEventCategoriesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventCategoriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventCategoriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateEventCategoriesResponse })
  async create(@Body() payload: CreateEventCategoriesRequest) {
    const cmd = new CreateEventCategoriesCommand(payload.title);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateEventCategoriesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventCategoriesRequest,
  ) {
    const cmd = new UpdateEventCategoriesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventCategoriesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}