import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllLanguagesResponse } from './queries/get-all-languages/get-all-languages.response';
import { GetAllLanguagesFilters } from './queries/get-all-languages/get-all-languages.filters';
import { GetAllLanguagesRequest } from './queries/get-all-languages/get-all-languages.request';
import { GetOneLanguagesResponse } from './queries/get-one-languages/get-one-languages.response';
import { GetOneLanguagesRequest } from './queries/get-one-languages/get-one-languages.request';
import { CreateLanguagesResponse } from './commands/create-languages/create-languages.response';
import { CreateLanguagesRequest } from './commands/create-languages/create-languages.request';
import { CreateLanguagesCommand } from './commands/create-languages/create-languages.command';
import { UpdateLanguagesResponse } from './commands/update-languages/update-languages.response';
import { UpdateLanguagesRequest } from './commands/update-languages/update-languages.request';
import { DeleteLanguagesRequest } from './commands/delete-languages/delete-languages.request';

@Controller('languages')
export class LanguagesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllLanguagesResponse] })
  async getAll(@Query() filters: GetAllLanguagesFilters) {
    return await this.queryBus.execute(new GetAllLanguagesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneLanguagesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneLanguagesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateLanguagesResponse })
  async create(@Body() payload: CreateLanguagesRequest) {
    const cmd = new CreateLanguagesCommand(payload.title);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateLanguagesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateLanguagesRequest,
  ) {
    const cmd = new UpdateLanguagesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteLanguagesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}