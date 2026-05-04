import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllFaqsResponse } from './queries/get-all-faqs/get-all-faqs.response';
import { GetAllFaqsFilters } from './queries/get-all-faqs/get-all-faqs.filters';
import { GetAllFaqsRequest } from './queries/get-all-faqs/get-all-faqs.request';
import { GetOneFaqsResponse } from './queries/get-one-faqs/get-one-faqs.response';
import { GetOneFaqsRequest } from './queries/get-one-faqs/get-one-faqs.request';
import { CreateFaqsResponse } from './commands/create-faqs/create-faqs.response';
import { CreateFaqsRequest } from './commands/create-faqs/create-faqs.request';
import { CreateFaqsCommand } from './commands/create-faqs/create-faqs.command';
import { UpdateFaqsResponse } from './commands/update-faqs/update-faqs.response';
import { UpdateFaqsRequest } from './commands/update-faqs/update-faqs.request';
import { DeleteFaqsRequest } from './commands/delete-faqs/delete-faqs.request';

@Controller('faqs')
export class FaqsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllFaqsResponse] })
  async getAll(@Query() filters: GetAllFaqsFilters) {
    return await this.queryBus.execute(new GetAllFaqsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateFaqsResponse })
  async create(@Body() payload: CreateFaqsRequest) {
    const cmd = new CreateFaqsCommand(
      payload.question,
      payload.answer,
      payload.tagsId,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateFaqsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateFaqsRequest,
  ) {
    const cmd = new UpdateFaqsRequest();
    cmd.id = id;
    cmd.question = payload.question;
    cmd.answer = payload.answer;
    cmd.tagsId = payload.tagsId;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteFaqsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}