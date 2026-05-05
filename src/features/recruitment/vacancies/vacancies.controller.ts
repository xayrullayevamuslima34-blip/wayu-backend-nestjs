import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllVacanciesAdminResponse } from './admin/queries/get-all-vacancies/get-all-vacancies.admin.response';
import { GetAllVacanciesAdminFilters } from './admin/queries/get-all-vacancies/get-all-vacancies.admin.filters';
import { GetAllVacanciesAdminRequest } from './admin/queries/get-all-vacancies/get-all-vacancies.admin.request';
import { GetOneVacanciesAdminResponse } from './admin/queries/get-one-vacancies/get-one-vacancies.admin.response';
import { GetOneVacanciesAdminRequest } from './admin/queries/get-one-vacancies/get-one-vacancies.admin.request';
import { CreateVacanciesAdminResponse } from './admin/commands/create-vacancies/create-vacancies.admin.response';
import { CreateVacanciesAdminRequest } from './admin/commands/create-vacancies/create-vacancies.admin.request';
import { CreateVacanciesAdminCommand } from './admin/commands/create-vacancies/create-vacancies.admin.command';
import { UpdateVacanciesAdminResponse } from './admin/commands/update-vacancies/update-vacancies.admin.response';
import { UpdateVacanciesAdminRequest } from './admin/commands/update-vacancies/update-vacancies.admin.request';
import { DeleteVacanciesAdminRequest } from './admin/commands/delete-vacancies/delete-vacancies.admin.request';
import {
  GetAllVacanciesPublicResponse
} from '@/features/recruitment/vacancies/public/queries/get-all-vacancies/get-all-vacancies.public.response';
import {
  GetAllVacanciesPublicFilters
} from '@/features/recruitment/vacancies/public/queries/get-all-vacancies/get-all-vacancies.public.filters';
import {
  GetAllVacanciesPublicRequest
} from '@/features/recruitment/vacancies/public/queries/get-all-vacancies/get-all-vacancies.public.request';
import {
  GetOneVacanciesPublicResponse
} from '@/features/recruitment/vacancies/public/queries/get-one-vacancies/get-one-vacancies.public.response';
import {
  GetOneVacanciesPublicRequest
} from '@/features/recruitment/vacancies/public/queries/get-one-vacancies/get-one-vacancies.public.request';

@Controller('admin/vacancies')
export class VacanciesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllVacanciesAdminResponse] })
  async getAll(@Query() filters: GetAllVacanciesAdminFilters) {
    return await this.queryBus.execute(new GetAllVacanciesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacanciesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacanciesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateVacanciesAdminResponse })
  async create(@Body() payload: CreateVacanciesAdminRequest) {
    const cmd = new CreateVacanciesAdminCommand(
      payload.title,
      payload.address,
      payload.description,
      payload.phoneNumber,
      payload.type,
      payload.salary,
      payload.isActive,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateVacanciesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVacanciesAdminRequest,
  ) {
    const cmd = new UpdateVacanciesAdminRequest();
    cmd.id = id;
    cmd.title = payload.title;
    cmd.address = payload.address;
    cmd.description = payload.description;
    cmd.phoneNumber = payload.phoneNumber;
    cmd.type = payload.type;
    cmd.salary = payload.salary;
    cmd.isActive = payload.isActive;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteVacanciesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}



@Controller('public/vacancies')
export class VacanciesPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllVacanciesPublicResponse] })
  async getAll(@Query() filters: GetAllVacanciesPublicFilters) {
    return await this.queryBus.execute(new GetAllVacanciesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacanciesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacanciesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}