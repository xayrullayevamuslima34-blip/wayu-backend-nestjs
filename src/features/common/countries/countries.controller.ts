import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { GetAllCountriesResponse } from './queries/get-all-countries/get-all-countries.response';
import { GetAllCountriesFilters } from './queries/get-all-countries/get-all-countries.filters';
import { GetAllCountriesRequest } from './queries/get-all-countries/get-all-countries.request';
import { GetOneCountriesResponse } from './queries/get-one-countries/get-one-countries.response';
import { GetOneCountriesRequest } from './queries/get-one-countries/get-one-countries.request';
import { CreateCountriesResponse } from './command/create-countries/create-countries.response';
import { CreateCountriesRequest } from './command/create-countries/create-countries.request';
import { CreateCountriesCommand } from './command/create-countries/create-countries.command';
import { UpdateCountriesResponse } from './command/update-countries/update-countries.response';
import { UpdateCountriesRequest } from './command/update-countries/update-countries.request';
import { DeleteCountriesRequest } from './command/delete-countries/delete-countries.request';

@Controller('countries')
export class CountriesController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllCountriesResponse] })
  async getAll(@Query() filters: GetAllCountriesFilters) {
    return await this.queryBus.execute(new GetAllCountriesRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountriesResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountriesRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateCountriesResponse })
  async create(
    @Body() payload: CreateCountriesRequest,
    @UploadedFile() flag: Express.Multer.File,
  ) {
    const cmd = new CreateCountriesCommand(
      payload.title,
      flag,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (flag && fs.existsSync(flag.path)) fs.rmSync(flag.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateCountriesResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCountriesRequest,
    @UploadedFile() flag?: Express.Multer.File,
  ) {
    const cmd = new UpdateCountriesRequest();
    cmd.id = id;
    cmd.title = payload.title;
    cmd.flag = flag;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (flag && fs.existsSync(flag.path)) fs.rmSync(flag.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountriesRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}