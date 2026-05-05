import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { GetAllEventsAdminFilter } from './admin/queries/get-all-events/get-all-events.admin.filter';
import { GetAllEventsAdminResponse } from './admin/queries/get-all-events/get-all-events.admin.response';
import { GetAllEventsAdminRequest } from './admin/queries/get-all-events/get-all-events.admin.request';

import { GetOneEventsAdminResponse } from './admin/queries/get-one-events/get-one-events.admin.response';
import { GetOneEventsAdminRequest } from './admin/queries/get-one-events/get-one-events.admin.request';
import {
  CreateEventsAdminResponse,
} from '@/features/events/events/admin/commands/create-events/create-events.admin.response';
import {
  CreateEventsAdminRequest,
} from '@/features/events/events/admin/commands/create-events/create-events.admin.request';
import {
  CreateEventsAdminCommand,
} from '@/features/events/events/admin/commands/create-events/create-events.admin.command';
import {
  UpdateEventsAdminResponse,
} from '@/features/events/events/admin/commands/update-events/update-events.admin.response';
import {
  UpdateEventsAdminRequest,
} from '@/features/events/events/admin/commands/update-events/update-events.admin.request';
import {
  DeleteEventsAdminRequest,
} from '@/features/events/events/admin/commands/delete-events/delete-events.admin.request';
import {
  GetAllEventsPublicResponse,
} from '@/features/events/events/public/queries/get-all-events/get-all-events.public.response';
import {
  GetAllEventsPublicFilter,
} from '@/features/events/events/public/queries/get-all-events/get-all-events.public.filter';
import {
  GetAllEventsPublicRequest,
} from '@/features/events/events/public/queries/get-all-events/get-all-events.public.request';
import {
  GetOneEventsPublicResponse,
} from '@/features/events/events/public/queries/get-one-events/get-one-events.public.response';
import {
  GetOneEventsPublicRequest,
} from '@/features/events/events/public/queries/get-one-events/get-one-events.public.request';

@Controller('admin/events')
export class EventsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllEventsAdminResponse] })
  async getAll(@Query() filters: GetAllEventsAdminFilter) {
    return await this.queryBus.execute(new GetAllEventsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateEventsAdminResponse })
  async create(
    @Body() payload: CreateEventsAdminRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateEventsAdminCommand(
      payload.categoryId,
      payload.title,
      payload.content,
      image,
      payload.date,
      payload.address,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiOkResponse({ type: UpdateEventsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventsAdminRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateEventsAdminRequest();
    cmd.id = id;
    cmd.categoryId = payload.categoryId;
    cmd.title = payload.title;
    cmd.content = payload.content;
    cmd.date = payload.date;
    cmd.address = payload.address;
    cmd.image = image;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteEventsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/events')
export class EventsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllEventsPublicResponse] })
  async getAll(@Query() filters: GetAllEventsPublicFilter) {
    return await this.queryBus.execute(new GetAllEventsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

}