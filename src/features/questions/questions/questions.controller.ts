import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllQuestionsAdminResponse } from './admin/queries/get-all-questions/get-all-questions.admin.response';
import { GetAllQuestionsAdminFilters } from './admin/queries/get-all-questions/get-all-questions.admin.filters';
import { GetAllQuestionsAdminRequest } from './admin/queries/get-all-questions/get-all-questions.admin.request';
import { GetOneQuestionsAdminResponse } from './admin/queries/get-one-questions/get-one-questions.admin.response';
import { GetOneQuestionsAdminRequest } from './admin/queries/get-one-questions/get-one-questions.admin.request';
import { CreateQuestionsAdminResponse } from './admin/commands/create-questions/create-questions.admin.response';
import { CreateQuestionsAdminRequest } from './admin/commands/create-questions/create-questions.admin.request';
import { CreateQuestionsAdminCommand } from './admin/commands/create-questions/create-questions.admin.command';
import { UpdateQuestionsAdminResponse } from './admin/commands/update-questions/update-questions.admin.response';
import { UpdateQuestionsAdminRequest } from './admin/commands/update-questions/update-questions.admin.request';
import { DeleteQuestionsAdminRequest } from './admin/commands/delete-questions/delete-questions.admin.request';
import {
  GetAllQuestionsPublicResponse
} from '@/features/questions/questions/public/queries/get-all-questions/get-all-questions.public.response';
import {
  GetAllQuestionsPublicFilters
} from '@/features/questions/questions/public/queries/get-all-questions/get-all-questions.public.filters';
import {
  GetAllQuestionsPublicRequest
} from '@/features/questions/questions/public/queries/get-all-questions/get-all-questions.public.request';
import {
  GetOneQuestionsPublicResponse
} from '@/features/questions/questions/public/queries/get-one-questions/get-one-questions.public.response';
import {
  GetOneQuestionsPublicRequest
} from '@/features/questions/questions/public/queries/get-one-questions/get-one-questions.public.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/questions')
export class QuestionsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllQuestionsAdminResponse] })
  async getAll(@Query() filters: GetAllQuestionsAdminFilters) {
    return await this.queryBus.execute(new GetAllQuestionsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneQuestionsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateQuestionsAdminResponse })
  async create(@Body() payload: CreateQuestionsAdminRequest) {
    const cmd = new CreateQuestionsAdminCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.question,
      payload.status,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateQuestionsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateQuestionsAdminRequest,
  ) {
    const cmd = new UpdateQuestionsAdminRequest();
    cmd.id = id;
    cmd.fullName = payload.fullName;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.question = payload.question;
    cmd.status = payload.status;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteQuestionsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}



@Controller('public/questions')
export class QuestionsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllQuestionsPublicResponse] })
  async getAll(@Query() filters: GetAllQuestionsPublicFilters) {
    return await this.queryBus.execute(new GetAllQuestionsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneQuestionsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneQuestionsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}