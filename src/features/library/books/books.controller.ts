import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ApiBearerAuth, ApiConsumes, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { storageOptions } from '@/config/multer.config';
import fs from 'fs';
import { GetAllBooksAdminResponse } from './admin/queries/get-all-books/get-all-books.admin.response';
import { GetAllBooksAdminFilters } from './admin/queries/get-all-books/get-all-books.admin.filters';
import { GetAllBooksAdminRequest } from './admin/queries/get-all-books/get-all-books.admin.request';
import { GetOneBooksAdminResponse } from './admin/queries/get-one-books/get-one-books.admin.response';
import { GetOneBooksAdminRequest } from './admin/queries/get-one-books/get-one-books.admin.request';
import { CreateBooksAdminRequest } from './admin/commands/create-books/create-books.admin.request';
import { CreateBooksAdminResponse } from './admin/commands/create-books/create-books.admin.response';
import { CreateBooksAdminCommand } from './admin/commands/create-books/create-books.admin.command';
import { UpdateBooksAdminResponse } from './admin/commands/update-books/update-books.admin.response';
import { UpdateBooksAdminRequest } from './admin/commands/update-books/update-books.admin.request';
import { DeleteBooksAdminRequest } from './admin/commands/delete-books/delete-books.admin.request';
import {
  GetAllBooksPublicResponse
} from '@/features/library/books/public/queries/get-all-books/get-all-books.public.response';
import {
  GetAllBooksPublicFilters
} from '@/features/library/books/public/queries/get-all-books/get-all-books.public.filters';
import {
  GetAllBooksPublicRequest
} from '@/features/library/books/public/queries/get-all-books/get-all-books.public.request';
import {
  GetOneBooksPublicResponse
} from '@/features/library/books/public/queries/get-one-books/get-one-books.public.response';
import {
  GetOneBooksPublicRequest
} from '@/features/library/books/public/queries/get-one-books/get-one-books.public.request';
import { Roles } from '@/core/decorators/role.decorators';
import { Role } from '@/core/enums/role.enum';

@Roles(Role.Admin)
@ApiBearerAuth()
@Controller('admin/books')
export class BooksAdminController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get('list')
  @ApiOkResponse({ type: [GetAllBooksAdminResponse] })
  async getAll(@Query() filters: GetAllBooksAdminFilters) {
    return await this.queryBus.execute(new GetAllBooksAdminRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBooksAdminResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBooksAdminRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Post('create')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ], { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 10 } }))
  @ApiCreatedResponse({ type: CreateBooksAdminResponse })
  async create(
    @Body() payload: CreateBooksAdminRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0];
    const file = files.file?.[0];

    const cmd = new CreateBooksAdminCommand(
      payload.authorId,
      payload.categoryId,
      payload.title,
      payload.pages,
      payload.year,
      payload.description,
      image,
      file,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      if (file && fs.existsSync(file.path)) fs.rmSync(file.path);
      throw exc;
    }
  }

  @Patch('update/:id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'image', maxCount: 1 },
    { name: 'file', maxCount: 1 },
  ], { storage: storageOptions, limits: { fileSize: 1024 * 1024 * 10 } }))
  @ApiOkResponse({ type: UpdateBooksAdminResponse })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateBooksAdminRequest,
    @UploadedFiles() files: { image?: Express.Multer.File[], file?: Express.Multer.File[] },
  ) {
    const image = files.image?.[0];
    const file = files.file?.[0];

    const cmd = new UpdateBooksAdminRequest();
    cmd.id = id;
    cmd.authorId = payload.authorId;
    cmd.categoryId = payload.categoryId;
    cmd.title = payload.title;
    cmd.description = payload.description;
    cmd.pages = payload.pages;
    cmd.year = payload.year;
    cmd.image = image;
    cmd.file = file;
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (image && fs.existsSync(image.path)) fs.rmSync(image.path);
      if (file && fs.existsSync(file.path)) fs.rmSync(file.path);
      throw exc;
    }
  }

  @Delete('delete/:id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteBooksAdminRequest();
    cmd.id = id;
    return await this.commandBus.execute(cmd);
  }
}


@Controller('public/books')
export class BooksPublicController {
  constructor(
    private readonly queryBus: QueryBus,
  ) {
  }

  @Get('list')
  @ApiOkResponse({ type: [GetAllBooksPublicResponse] })
  async getAll(@Query() filters: GetAllBooksPublicFilters) {
    return await this.queryBus.execute(new GetAllBooksPublicRequest(filters));
  }

  @Get(':id')
  @ApiOkResponse({ type: GetOneBooksPublicResponse })
  async getOne(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneBooksPublicRequest();
    query.id = id;
    return await this.queryBus.execute(query);
  }
}