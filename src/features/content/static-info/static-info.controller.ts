import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllStaticInfoResponse } from './queries/get-all-static-info/get-all-static-info.response';
import { GetAllStaticInfoFilters } from './queries/get-all-static-info/get-all-static-info.filters';
import { GetAllStaticInfoRequest } from './queries/get-all-static-info/get-all-static-info.request';
import { GetOneStaticInfoResponse } from './queries/get-one-static-info/get-one-static-info.response';
import { GetOneStaticInfoRequest } from './queries/get-one-static-info/get-one-static-info.request';
import { CreateStaticInfoResponse } from './commands/create-static-info/create-static-info.response';
import { CreateStaticInfoRequest } from './commands/create-static-info/create-static-info.request';
import { CreateStaticInfoCommand } from './commands/create-static-info/create-static-info.command';
import { UpdateStaticInfoResponse } from './commands/update-static-info/update-static-info.response';
import { UpdateStaticInfoRequest } from './commands/update-static-info/update-static-info.request';
import { DeleteStaticInfoRequest } from './commands/delete-static-info/delete-static-info.request';

@Controller('static-info')
export class StaticInfoController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllStaticInfoResponse] })
  async getAll(@Query() filters: GetAllStaticInfoFilters) {
    return await this.queryBus.execute(new GetAllStaticInfoRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneStaticInfoResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneStaticInfoRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateStaticInfoResponse })
  async create(@Body() payload: CreateStaticInfoRequest) {
    const cmd = new CreateStaticInfoCommand(
      payload.aboutUs,
      payload.appStoreLink,
      payload.playMarketLink,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateStaticInfoResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateStaticInfoRequest,
  ) {
    const cmd = new UpdateStaticInfoRequest();
    cmd.id = id;
    cmd.appStoreLink = payload.appStoreLink;
    cmd.playMarketLink = payload.playMarketLink;
    cmd.aboutUs = payload.aboutUs;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteStaticInfoRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}