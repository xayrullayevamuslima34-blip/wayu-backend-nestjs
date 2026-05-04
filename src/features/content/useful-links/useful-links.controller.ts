import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { GetAllUsefulLinksResponse } from './queries/get-all-useful-links/get-all-useful-links.response';
import { GetAllUsefulLinksFilters } from './queries/get-all-useful-links/get-all-useful-links.filters';
import { GetAllUsefulLinksRequest } from './queries/get-all-useful-links/get-all-useful-links.request';
import { GetOneUsefulLinksResponse } from './queries/get-one-useful-links/get-one-useful-links.response';
import { GetOneUsefulLinksRequest } from './queries/get-one-useful-links/get-one-useful-links.request';
import { CreateUsefulLinksResponse } from './commands/create-useful-links/create-useful-links.response';
import { CreateUsefulLinksRequest } from './commands/create-useful-links/create-useful-links.request';
import { CreateUsefulLinksCommand } from './commands/create-useful-links/create-useful-links.command';
import { UpdateUsefulLinksResponse } from './commands/update-useful-links/update-useful-links.response';
import { UpdateUsefulLinksRequest } from './commands/update-useful-links/update-useful-links.request';
import { DeleteUsefulLinksRequest } from './commands/delete-useful-links/delete-useful-links.request';

@Controller('useful-links')
export class UsefulLinksController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllUsefulLinksResponse] })
  async getAll(@Query() filters: GetAllUsefulLinksFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinksRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneUsefulLinksResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinksRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateUsefulLinksResponse })
  async create(
    @Body() payload: CreateUsefulLinksRequest,
    @UploadedFile() icon: Express.Multer.File,
  ) {
    const cmd = new CreateUsefulLinksCommand(
      payload.title,
      icon,
      payload.link,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateUsefulLinksResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUsefulLinksRequest,
    @UploadedFile() icon?: Express.Multer.File,
  ) {
    const cmd = new UpdateUsefulLinksRequest();
    cmd.id = id;
    cmd.title = payload.title;
    cmd.link = payload.link;
    cmd.icon = icon;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (icon && fs.existsSync(icon.path)) fs.rmSync(icon.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinksRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}