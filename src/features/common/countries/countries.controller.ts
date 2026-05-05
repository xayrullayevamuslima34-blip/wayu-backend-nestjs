import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { GetAllCountriesPublicResponse } from './public/queries/get-all-countries-public/get-all-countries.public.response';
import { GetAllCountriesPublicFilters } from './public/queries/get-all-countries-public/get-all-countries.public.filters';
import { GetAllCountriesPublicRequest } from './public/queries/get-all-countries-public/get-all-countries.public.request';
import { GetOneCountriesPublicResponse } from './public/queries/get-one-countries-public/get-one-countries.public.response';
import { GetOneCountriesPublicRequest } from './public/queries/get-one-countries-public/get-one-countries.public.request';
import { CreateCountriesAdminResponse } from './admin/commands/create-countries-admin/create-countries.admin.response';
import { CreateCountriesAdminRequest } from './admin/commands/create-countries-admin/create-countries.admin.request';
import { CreateCountriesAdminCommand } from './admin/commands/create-countries-admin/create-countries.admin.command';
import { UpdateCountriesAdminResponse } from './admin/commands/update-countries-admin/update-countries.admin.response';
import { UpdateCountriesAdminRequest } from './admin/commands/update-countries-admin/update-countries.admin.request';
import { DeleteCountriesAdminRequest } from './admin/commands/delete-countries-admin/delete-countries.admin.request';
import {
  GetAllCountriesAdminResponse
} from './admin/queries/get-all-countries-admin/get-all-countries.admin.response';
import {
  GetAllCountriesAdminFilters
} from './admin/queries/get-all-countries-admin/get-all-countries.admin.filters';
import {
  GetAllCountriesAdminRequest
} from './admin/queries/get-all-countries-admin/get-all-countries.admin.request';
import {
  GetOneCountriesAdminResponse
} from './admin/queries/get-one-countries-admin/get-one-countries.admin.response';
import {
  GetOneCountriesAdminRequest
} from './admin/queries/get-one-countries-admin/get-one-countries.admin.request';

@Controller('admin/countries')
export class CountriesAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllCountriesAdminResponse] })
  async getAll(@Query() filters: GetAllCountriesAdminFilters) {
    return await this.queryBus.execute(new GetAllCountriesAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountriesAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountriesAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateCountriesAdminResponse })
  async create(
    @Body() payload: CreateCountriesAdminRequest,
    @UploadedFile() flag: Express.Multer.File,
  ) {
    const cmd = new CreateCountriesAdminCommand(
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
  @ApiOkResponse({ type: UpdateCountriesAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateCountriesAdminRequest,
    @UploadedFile() flag?: Express.Multer.File,
  ) {
    const cmd = new UpdateCountriesAdminRequest();
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
    const cmd = new DeleteCountriesAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

}


@Controller('public/countries')
export class CountriesPublicController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllCountriesPublicResponse] })
  async getAll(@Query() filters: GetAllCountriesPublicFilters) {
    return await this.queryBus.execute(new GetAllCountriesPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneCountriesPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountriesPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }


}
