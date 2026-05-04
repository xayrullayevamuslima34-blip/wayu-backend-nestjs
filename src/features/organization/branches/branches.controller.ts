import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { GetAllBranchesResponse } from './queries/get-all-branches/get-all-branches.response';
import { GetAllBranchesFilters } from './queries/get-all-branches/get-all-branches.filters';
import { GetAllBranchesRequest } from './queries/get-all-branches/get-all-branches.request';
import { GetOneBranchesResponse } from './queries/get-one-branches/get-one-branches.response';
import { GetOneBranchesRequest } from './queries/get-one-branches/get-one-branches.request';
import { CreateBranchesResponse } from './commands/create-branches/create-branches.response';
import { CreateBranchesRequest } from './commands/create-branches/create-branches.request';
import { CreateBranchesCommand } from './commands/create-branches/create-branches.command';
import { UpdateBranchesResponse } from './commands/update-branches/update-branches.response';
import { UpdateBranchesRequest } from './commands/update-branches/update-branches.request';
import { DeleteBranchesRequest } from './commands/delete-branches/delete-branches.request';

@Controller('branches')
export class BranchesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllBranchesResponse] })
  async getAll(@Query() filters: GetAllBranchesFilters) {
    return await this.queryBus.execute(new GetAllBranchesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBranchesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBranchesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiCreatedResponse({ type: CreateBranchesResponse })
  async create(@Body() payload: CreateBranchesRequest) {
    const cmd = new CreateBranchesCommand(
      payload.countryId,
      payload.representativeId,
      payload.city,
      payload.latitude,
      payload.longitude,
      payload.phoneNumber,
    );
    return await this.commandBus.execute(cmd);
  }

  @Patch('update/:id')
  @ApiOkResponse({ type: UpdateBranchesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBranchesRequest,
  ) {
    const cmd = new UpdateBranchesRequest();
    cmd.id = id;
    cmd.countryId = payload.countryId;
    cmd.representativeId = payload.representativeId;
    cmd.city = payload.city;
    cmd.latitude = payload.latitude;
    cmd.longitude = payload.longitude;
    cmd.phoneNumber = payload.phoneNumber;
    return await this.commandBus.execute(cmd);
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBranchesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}