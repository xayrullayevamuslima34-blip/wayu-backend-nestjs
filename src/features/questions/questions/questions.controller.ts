import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllQuestionsResponse } from './queries/get-all-questions/get-all-questions.response';
import { GetAllQuestionsFilters } from './queries/get-all-questions/get-all-questions.filters';
import { GetAllQuestionsRequest } from './queries/get-all-questions/get-all-questions.request';
import { GetOneQuestionsResponse } from './queries/get-one-questions/get-one-questions.response';
import { GetOneQuestionsRequest } from './queries/get-one-questions/get-one-questions.request';
import { CreateQuestionsResponse } from './commands/create-questions/create-questions.response';
import { CreateQuestionsRequest } from './commands/create-questions/create-questions.request';
import { CreateQuestionsCommand } from './commands/create-questions/create-questions.command';
import { UpdateQuestionsResponse } from './commands/update-questions/update-questions.response';
import { UpdateQuestionsRequest } from './commands/update-questions/update-questions.request';
import { DeleteQuestionsRequest } from './commands/delete-questions/delete-questions.request';

@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllQuestionsResponse] })
  async getAll(@Query() filters: GetAllQuestionsFilters) {
    return await this.queryBus.execute(new GetAllQuestionsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneQuestionsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateQuestionsResponse })
  async create(@Body() payload: CreateQuestionsRequest) {
    const cmd = new CreateQuestionsCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.question,
      payload.status,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateQuestionsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateQuestionsRequest,
  ) {
    const cmd = new UpdateQuestionsRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.question = payload.question;
    cmd.status = payload.status;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteQuestionsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}