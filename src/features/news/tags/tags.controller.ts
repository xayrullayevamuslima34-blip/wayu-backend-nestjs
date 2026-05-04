import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllTagsResponse } from './queries/get-all-tags/get-all-tags.response';
import { GetAllTagsRequest } from './queries/get-all-tags/get-all-tags.request';
import { GetOneTagsResponse } from './queries/get-one-tags/get-one-tags.response';
import { GetOneTagsRequest } from './queries/get-one-tags/get-one-tags.request';
import { CreateTagsResponse } from './commands/create-tags/create-tags-response';
import { CreateTagsRequest } from './commands/create-tags/create-tags-request';
import { UpdateTagsResponse } from './commands/update-tags/update-tags.response';
import { UpdateTagsRequest } from './commands/update-tags/update-tags.request';
import { DeleteTagsRequest } from './commands/delete-tags/delete-tags-request';
import { GetAllTagsFilters } from './queries/get-all-tags/get-all-tags.filter';

@Controller('tags')
export class TagsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllTagsResponse] })  // ✅ array
  async getAll(@Query() filters: GetAllTagsFilters) {
    return await this.queryBus.execute(new GetAllTagsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneTagsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {  // ✅ ParseIntPipe
    const query = new GetOneTagsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post()
  @ApiCreatedResponse({ type: CreateTagsResponse })
  async create(@Body() payload: CreateTagsRequest) {
    return await this.commandBus.execute(payload);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UpdateTagsResponse })
  async update(@Param('id', ParseIntPipe) id: number, @Body() payload: UpdateTagsRequest) {  // ✅ ParseIntPipe
    const cmd = new UpdateTagsRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete(':id')
  @ApiOkResponse()
  async delete(@Param('id', ParseIntPipe) id: number) {  // ✅ ParseIntPipe
    const cmd = new DeleteTagsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}