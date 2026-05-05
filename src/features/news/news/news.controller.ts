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
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { CreateNewsAdminResponse } from './admin/commands/create-news/create-news.admin.response';
import { CreateNewsAdminCommand } from './admin/commands/create-news/create-news.admin.command';
import { UpdateNewsAdminResponse } from './admin/commands/update-news/update-news.admin.response';
import { UpdateNewsAdminCommand } from './admin/commands/update-news/update-news.admin.command';
import { DeleteNewsAdminRequest } from './admin/commands/delete-news/delete-news.admin.request';
import { GetAllNewsAdminResponse } from './admin/queries/get-all-news/get-all-news.admin.response';
import { GetAllNewsAdminRequest } from './admin/queries/get-all-news/get-all-news.admin.request';
import { GetOneNewsAdminResponse } from './admin/queries/get-one-news/get-one-news.admin.response';
import { GetOneNewsAdminRequest } from './admin/queries/get-one-news/get-one-news.admin.request';
import { CreateNewsAdminRequest } from './admin/commands/create-news/create-news.admin.request';
import { GetAllNewsAdminFilters } from '@/features/news/news/admin/queries/get-all-news/get-all-news.admin.filters';
import {
  GetAllNewsPublicResponse
} from '@/features/news/news/public/queries/get-all-news/get-all-news.public.response';
import { GetAllNewsPublicRequest } from '@/features/news/news/public/queries/get-all-news/get-all-news.public.request';
import {
  GetOneNewsPublicResponse
} from '@/features/news/news/public/queries/get-one-news/get-one-news.public.response';
import { GetOneNewsPublicRequest } from '@/features/news/news/public/queries/get-one-news/get-one-news.public.request';
import { GetAllNewsPublicFilters } from '@/features/news/news/public/queries/get-all-news/get-all-news.public.filters';

@Controller('admin/news')
export class NewsAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get("list")
  @ApiOkResponse({ type: [GetAllNewsAdminResponse] })
  async getAll(@Query() filters: GetAllNewsAdminFilters) {
    return await this.queryBus.execute(new GetAllNewsAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image', { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 6 } }))
  @ApiCreatedResponse({ type: CreateNewsAdminResponse })
  async create(
    @Body() payload: CreateNewsAdminRequest,
    @UploadedFile() image: Express.Multer.File,
  ) {
    const cmd = new CreateNewsAdminCommand(
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
  @ApiOkResponse({ type: UpdateNewsAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateNewsAdminCommand,
    @UploadedFile() image?: Express.Multer.File,
  ) {
    const cmd = new UpdateNewsAdminCommand(
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
    const cmd = new DeleteNewsAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }

}


@Controller('public/news')
export class NewsPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get("list")
  @ApiOkResponse({ type: [GetAllNewsPublicResponse] })
  async getAll(@Query() filters: GetAllNewsPublicFilters) {
    return await this.queryBus.execute(new GetAllNewsPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneNewsPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneNewsPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}