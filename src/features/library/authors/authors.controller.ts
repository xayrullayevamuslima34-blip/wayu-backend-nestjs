import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllAuthorsResponse } from './queries/get-all-authors/get-all-authors.response';
import { GetAllAuthorsFilters } from './queries/get-all-authors/get-all-authors.filters';
import { GetAllAuthorsRequest } from './queries/get-all-authors/get-all-authors.request';
import { GetOneAuthorsResponse } from './queries/get-one-authors/get-one-authors.response';
import { GetOneAuthorsRequest } from './queries/get-one-authors/get-one-authors.request';
import { CreateAuthorsResponse } from './commands/create-authors/create-authors.response';
import { CreateAuthorsRequest } from './commands/create-authors/create-authors.request';
import { CreateAuthorsCommand } from './commands/create-authors/create-authors.command';
import { UpdateAuthorsResponse } from './commands/update-authors/update-authors.response';
import { UpdateAuthorsRequest } from './commands/update-authors/update-authors.request';
import { DeleteAuthorsRequest } from './commands/delete-authors/delete-authors.request';

@Controller('authors')
export class AuthorsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllAuthorsResponse] })
  async getAll(@Query() filters: GetAllAuthorsFilters) {
    return await this.queryBus.execute(new GetAllAuthorsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneAuthorsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneAuthorsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateAuthorsResponse })
  async create(@Body() payload: CreateAuthorsRequest) {
    const cmd = new CreateAuthorsCommand(payload.fullName);
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateAuthorsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateAuthorsRequest,
  ) {
    const cmd = new UpdateAuthorsRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteAuthorsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}