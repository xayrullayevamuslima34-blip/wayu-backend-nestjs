import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllFaqsPublicResponse } from './public/queries/get-all-faqs/get-all-faqs.public.response';
import { GetAllFaqsPublicFilters } from './public/queries/get-all-faqs/get-all-faqs.public.filters';
import { GetAllFaqsPublicRequest } from './public/queries/get-all-faqs/get-all-faqs.public.request';
import { GetOneFaqsPublicResponse } from './public/queries/get-one-faqs/get-one-faqs.public.response';
import { GetOneFaqsPublicRequest } from './public/queries/get-one-faqs/get-one-faqs.public.request';
import { CreateFaqsAdminResponse } from './admin/commands/create-faqs/create-faqs.admin.response';
import { CreateFaqsAdminRequest } from './admin/commands/create-faqs/create-faqs.admin.request';
import { CreateFaqsAdminCommand } from './admin/commands/create-faqs/create-faqs.admin.command';
import { UpdateFaqsAdminResponse } from './admin/commands/update-faqs/update-faqs.admin.response';
import { UpdateFaqsAdminRequest } from './admin/commands/update-faqs/update-faqs.admin.request';
import { DeleteFaqsAdminRequest } from './admin/commands/delete-faqs/delete-faqs.admin.request';
import {
  GetAllFaqsAdminResponse,
} from '@/features/content/faqs/admin/queries/get-all-faqs/get-all-faqs.admin.response';
import { GetAllFaqsAdminFilters } from '@/features/content/faqs/admin/queries/get-all-faqs/get-all-faqs.admin.filters';
import { GetAllFaqsAdminRequest } from '@/features/content/faqs/admin/queries/get-all-faqs/get-all-faqs.admin.request';
import {
  GetOneFaqsAdminResponse,
} from '@/features/content/faqs/admin/queries/get-one-faqs/get-one-faqs.admin.response';
import { GetOneFaqsAdminRequest } from '@/features/content/faqs/admin/queries/get-one-faqs/get-one-faqs.admin.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/faqs')
export class FaqsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllFaqsAdminResponse] })
  async getAll(@Query() filters: GetAllFaqsAdminFilters) {
    return await this.queryBus.execute(new GetAllFaqsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateFaqsAdminResponse })
  async create(@Body() payload: CreateFaqsAdminRequest) {
    const cmd = new CreateFaqsAdminCommand(
      payload.question,
      payload.answer,
      payload.tagsId,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateFaqsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateFaqsAdminRequest,
  ) {
    const cmd = new UpdateFaqsAdminRequest();
    cmd.id = id;
    cmd.question = payload.question;
    cmd.answer = payload.answer;
    cmd.tagsId = payload.tagsId;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteFaqsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/faqs')
export class FaqsPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllFaqsPublicResponse] })
  async getAll(@Query() filters: GetAllFaqsPublicFilters) {
    return await this.queryBus.execute(new GetAllFaqsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneFaqsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneFaqsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}