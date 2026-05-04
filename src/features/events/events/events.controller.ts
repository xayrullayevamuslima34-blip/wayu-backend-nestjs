import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { GetAllEventsFilter } from './queries/get-all-events/get-all-events.filter';
import { GetAllEventsResponse } from './queries/get-all-events/get-all-events.response';
import { GetAllEventsRequest } from './queries/get-all-events/get-all-events.request';
import { CreateEventRequest } from './commands/create-events/create-events.request';
import { CreateEventResponse } from './commands/create-events/create-events.response';
import { CreateEventCommand } from './commands/create-events/create-events.command';
import { UpdateEventResponse } from './commands/update-events/update-events.response';
import { UpdateEventRequest } from './commands/update-events/update-events.request';
import { GetOneEventResponse } from './queries/get-one-events/get-one-events.response';
import { GetOneEventRequest } from './queries/get-one-events/get-one-events.request';
import { DeleteEventRequest } from './commands/delete-events/delete-events.request';

@Controller('events')
export class EventsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllEventsResponse] })
  async getAll(@Query() filters: GetAllEventsFilter) {
    return await this.queryBus.execute(new GetAllEventsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneEventResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneEventRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateEventResponse })
  async create(
    @Body() payload: CreateEventRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateEventCommand(
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
  @ApiOkResponse({ type: UpdateEventResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateEventRequest,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateEventRequest();
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
    const cmd = new DeleteEventRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}