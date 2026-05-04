import {
  Body,
  Controller,
  Delete, Get,
  Param,
  ParseIntPipe,
  Patch,
  Post, Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '../../../config/multer.config';
import fs from 'fs';
import { CreateNewsResponse } from './admin/commands/create-news/create-news.response';
import { CreateNewsCommand } from './admin/commands/create-news/create-news.command';
import { UpdateNewsResponse } from './admin/commands/update-news/update-news.response';
import { UpdateNewsCommand } from './admin/commands/update-news/update-news.command';
import { DeleteNewsRequest } from './admin/commands/delete-news/delete-news.request';
import { GetAllNewsResponse } from './admin/queries/get-all-news/get-all-news.response';
import { GetAllNewsRequest } from './admin/queries/get-all-news/get-all-news.request';
import { GetOneNewsResponse } from './admin/queries/get-one-news/get-one-news.response';
import { GetOneNewsRequest } from './admin/queries/get-one-news/get-one-news.request';
import { GetAllNewsFilters } from './admin/queries/get-all-news/get-all-news.filter';
import { CreateNewsRequest } from './admin/commands/create-news/create-news.request';

@Controller('news/')
export class NewsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("list")
  @ApiOkResponse({ type: [GetAllNewsResponse] })
  async getAll(@Query() filters: GetAllNewsFilters) {
    return await this.queryBus.execute(new GetAllNewsRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateNewsResponse })
  async create(
    @Body() payload: CreateNewsRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateNewsCommand(
      payload.categoryId,
      payload.title,
      image,
      payload.date,
      payload.content,
      payload.countryId,
      payload.tagIds,
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
  @ApiOkResponse({ type: UpdateNewsResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsCommand,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateNewsCommand(
      id,
      payload.categoryId,
      payload.countryId,
      payload.title,
      image,
      payload.date,
      payload.content,
      payload.tagIds,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteNewsRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

}