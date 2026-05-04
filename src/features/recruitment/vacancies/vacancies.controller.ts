import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllVacanciesResponse } from './queries/get-all-vacancies/get-all-vacancies.response';
import { GetAllVacanciesFilters } from './queries/get-all-vacancies/get-all-vacancies.filters';
import { GetAllVacanciesRequest } from './queries/get-all-vacancies/get-all-vacancies.request';
import { GetOneVacanciesResponse } from './queries/get-one-vacancies/get-one-vacancies.response';
import { GetOneVacanciesRequest } from './queries/get-one-vacancies/get-one-vacancies.request';
import { CreateVacanciesResponse } from './commands/create-vacancies/create-vacancies.response';
import { CreateVacanciesRequest } from './commands/create-vacancies/create-vacancies.request';
import { CreateVacanciesCommand } from './commands/create-vacancies/create-vacancies.command';
import { UpdateVacanciesResponse } from './commands/update-vacancies/update-vacancies.response';
import { UpdateVacanciesRequest } from './commands/update-vacancies/update-vacancies.request';
import { DeleteVacanciesRequest } from './commands/delete-vacancies/delete-vacancies.request';

@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllVacanciesResponse] })
  async getAll(@Query() filters: GetAllVacanciesFilters) {
    return await this.queryBus.execute(new GetAllVacanciesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneVacanciesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneVacanciesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateVacanciesResponse })
  async create(@Body() payload: CreateVacanciesRequest) {
    const cmd = new CreateVacanciesCommand(
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
  @ApiOkResponse({ type: UpdateVacanciesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateVacanciesRequest,
  ) {
    const cmd = new UpdateVacanciesRequest();
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
    const cmd = new DeleteVacanciesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}